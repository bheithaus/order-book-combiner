import redis from 'redis'
import fetch from 'isomorphic-unfetch'
import uriTemplates from 'uri-templates'
import { MarketNames } from './available-markets'
import getData from './get-data'

const bittrex_URL_TEMPLATE = uriTemplates('https://api.bittrex.com/v3/markets/{market}/orderbook?depth=500')
const poloniex_URL_TEMPLATE = uriTemplates('https://poloniex.com/public?command=returnOrderBook&currencyPair={market}&depth=100')

// bittrex data processing
const bittrexKeys = {
  bids: 'bid',
  asks: 'ask'
}

// poloniex data processing
const poloniexKeys = {
  bids: 'bids',
  asks: 'asks'
}

// requirements

// Total liquidity (amount available) at each price point.
// Other considerations:
// ● Please complete the challenge in Nodejs (TypeScript preferred)
// ● Clearly label which is ask book and which is the bids book
// ● Clearly label which exchange has order volume at each price point
// ● Please host a demo of the code running online (free heroku site or similar)

// Data Pattern that will satisfy requirements
/**
 *
 * CombinedOrderBook: {
 *   asks: [
 *     {
 *       rate: float,
 *       totalLiquidity: float,
 *       bittrex: float,     -- quantity / liquidity
 *       poloniex: float     -- quantity / liquidity
 *     }
 *   ]
 *   bids: []
 * }
*/

interface Order {
  rate: number;
  totalLiquidity?: number;
  bittrex?: number;
  poloniex?: number;
  volume?: string;
  [key: string]: number | string | undefined;
}

interface OrderBookInterface {
  asks: [];
  bids: [];
  [key: string]: [];
}

interface BittrexOrder {
  quantity: string;
  rate: string;
  [key: string]: string;
}

interface BittrexOrderBook {
  bid: BittrexOrder[];
  ask: BittrexOrder[];
  [key: string]: BittrexOrder[];
}

interface PoloniexOrderBook {
  bids: [];
  asks: [];
  [key: string]: [];
}

interface DisparateBooks {
  bittrex: BittrexOrderBook;
  poloniex: PoloniexOrderBook;

  [key: string]: any;
}

class DataManager {
  /**
   * get combined orderbook
   * @param {string = 'BTC_ETH'} market   market name
   */
  async getOrderBook(market: string = 'BTC_ETH') {
    const marketName = MarketNames[market]

    console.log('market', market)
    console.log('marketName', marketName)

    const orderBooks: DisparateBooks = {
      bittrex: await getData(bittrex_URL_TEMPLATE.fill({ market: marketName.bittrex })),
      poloniex: await getData(poloniex_URL_TEMPLATE.fill({ market: marketName.poloniex }))
    }

    if (orderBooks.bittrex && orderBooks.poloniex) {
      return this.combineBooks(orderBooks, market)
    } else {
      return 'cannot get complete order book'
    }
  }

  private combineOrders(order1: Order, order2: Order) {
    const combined = Object.assign({}, order1, order2)

    // TODO - need to better understand - Type error: Object is possibly 'undefined'.
    combined.totalLiquidity = (combined.bittrex || 0) + (combined.poloniex || 0)

    if (combined.bittrex > combined.poloniex) {
      combined.volume = 'bittrex'
    } else if (combined.bittrex === combined.poloniex) {
      combined.volume = 'tie'
    } else {
      combined.volume = 'poloniex'
    }

    return combined
  }

  // TODO consider if there is a more robust way to import & merge data
  private combineBooks(books: DisparateBooks, market: string) {
    const combinedBook = {
      bids: {},
      asks: {}
    }

    // TODO - Question:
    // bittrex ETH-BTC market orders has some outlying data that seems irrelavant
    // should it be removed?
    Object.keys(bittrexKeys).forEach((key) => {
      books.bittrex[bittrexKeys[key]].forEach((bittrexOrder) => {
        const quantity = parseFloat(bittrexOrder.quantity)
        const order : Order = {
          rate: parseFloat(bittrexOrder.rate),
          bittrex: quantity,
          volume: 'bittrex',
          totalLiquidity: quantity
        }

        if (combinedBook[key][order.rate]) {
          // TODO - can I assume the API won't return multiple orders at same rate?
          console.log('duplicate rate')
          console.log('TODO perform merge')
        } else {
          combinedBook[key][order.rate] = order
        }
      })
    })

    Object.keys(poloniexKeys).forEach((key) => {
      books.poloniex[poloniexKeys[key]].forEach((poloniexOrder) => {
        const order : Order = {
          rate: parseFloat(poloniexOrder[0]),
          poloniex: poloniexOrder[1] // already a float from API
        }

        if (combinedBook[key][order.rate]) {
          console.log('merge orders at same rate', order.rate)
          combinedBook[key][order.rate] = this.combineOrders(combinedBook[key][order.rate], order)
        } else {
          order.totalLiquidity = order.poloniex
          order.volume = 'poloniex'

          combinedBook[key][order.rate] = order
        }
      })
    })

    return {
      bids: Object.values(combinedBook.bids),
      asks: Object.values(combinedBook.asks)
    }
  }
}

export default new DataManager()
