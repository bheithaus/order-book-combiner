import fetch from 'isomorphic-unfetch'

function remoteFetchJSON(url: string, callback: any) {
  return fetch(url)
    .then(r => r.json())
    .then(callback)
    .catch(console.error)
}

export default remoteFetchJSON
