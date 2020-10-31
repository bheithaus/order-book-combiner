import { StatusCodes } from 'http-status-codes'
import { NextApiRequest, NextApiResponse } from 'next'
import dataManager from '../../../libs/server/data-manager'

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

  let { orderBook, error } = await dataManager.getOrderBook(market)

  if (orderBook) {
    res.status(StatusCodes.OK).json(orderBook)
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }

}
