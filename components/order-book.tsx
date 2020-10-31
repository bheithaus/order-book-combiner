import React from 'react'
import { useTable } from 'react-table'
import useSWR from 'swr'
import uriTemplates from 'uri-templates'
import fetch from '../libs/client/fetch'

import utilStyles from '../styles/utils.module.css'
import OrderBookTable from './order-book-table'

const orderBook_URL_TEMPLATE = uriTemplates('/api/v1/order-book{?market}')

interface OrderBookInterface {
  asks: [],
  bids: []
}

export default function OrderBook(props: { market: string }) {
  const orderBookEndpoint = () => orderBook_URL_TEMPLATE.fill({ market: props.market })
  let { data, error } = useSWR<OrderBookInterface>(orderBookEndpoint, fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (<>
    <div className={utilStyles.row}>
      <div className={utilStyles.column}>
        <h2>Asks</h2>
        <OrderBookTable data={data.asks}/>
      </div>

      <div className={utilStyles.column}>
        <h2>Bids</h2>
        <OrderBookTable data={data.bids}/>
      </div>
    </div>
  </>)
}

