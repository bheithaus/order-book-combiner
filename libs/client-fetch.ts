import fetch from 'isomorphic-unfetch'

async function clientFetch <JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)
  return res.json()
}

export default clientFetch
