const AvailableMarkets = [
  { key: 'BTC_ETH', value: 'BTC_ETH', text: 'BTC_ETH' },
  { key: 'BTC_DOGE', value: 'BTC_DOGE', text: 'BTC_DOGE' },
  { key: 'BTC_XRP', value: 'BTC_XRP', text: 'BTC_XRP' }
]

interface marketNames {
  [key: string]: {
    [key: string]: string;
  };
}

const MarketNames: marketNames = {
  'BTC_ETH': {
    name: 'BTC_ETH',
    bittrex: 'ETH-BTC',
    poloniex: 'BTC_ETH'
  },
  'BTC_DOGE': {
    name: 'BTC_DOGE',
    bittrex: 'DOGE-BTC',
    poloniex: 'BTC_DOGE'
  },
  'BTC_XRP': {
    name: 'BTC_XRP',
    bittrex: 'XRP-BTC',
    poloniex: 'BTC_XRP'
  }
}

const API_Names = {
  bittrex: 'bittrex',
  poloniex: 'poloniex',
  totalLiquidity: 'totalLiquidity',
  volume: 'volume'
}

export {
  AvailableMarkets,
  MarketNames,
  API_Names
}
