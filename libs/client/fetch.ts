import fetch from 'isomorphic-unfetch'
import { StatusCodes } from 'http-status-codes'

async function clientFetch <JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const response = await fetch(input, init)
  const result = await response.json()

  if (response.status !== 200) {
    throw new Error(result.statusText)
  }

  return result
}

export default clientFetch
