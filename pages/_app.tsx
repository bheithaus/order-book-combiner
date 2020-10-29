import '../styles/global.css'
import { AppProps } from 'next/app'
require('dotenv').config()

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
