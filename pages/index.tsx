import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Dropdown } from 'semantic-ui-react'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import OrderBook from '../components/order-book'
import { AvailableMarkets } from '../libs/available-markets'

export default function Home() {
  const [market, setMarket] = useState(AvailableMarkets[0].key)

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>Order Book</h2>

        <Dropdown
          placeholder='Select Market'
          fluid
          search
          selection
          defaultValue={market}
          onChange={(evt, { name, value }: any) => { setMarket(value) }}
          options={AvailableMarkets}
        />

        <OrderBook market={market}></OrderBook>
      </section>
    </Layout>
  )
}
