import Head from 'next/head'
import Link from 'next/link'

import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import 'semantic-ui-css/semantic.min.css'

const name = 'Order Book Combiner'
export const siteTitle = 'Order Book Combiner'

export default function Layout({ children }: { children: React.ReactNode}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1 className={utilStyles.heading2Xl}>{name}</h1>
      </header>
      <main>{children}</main>
    </div>
  )
}
