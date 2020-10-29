import { NextApiRequest, NextApiResponse } from 'next'
import dataManager from '../../../libs/data-manager'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let market : string

  // TODO clean this up
  if (!req.query.market) {
    market = ''
  } else if (typeof req.query.market === 'string') {
    market = req.query.market
  } else {
    market = req.query.market[0]
  }

  const orderBook = await dataManager.getOrderBook(market)

  res.status(200).json(orderBook)
}
