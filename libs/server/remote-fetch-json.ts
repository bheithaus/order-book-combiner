import fetch from 'isomorphic-unfetch'

function remoteFetchJSON(url: string, callback: Function) {
  return fetch(url)
    .then(r => r.json())
    .then(data => callback({ data }))
    .catch((error) => {
      console.error(error)
      callback({ error })
    })
}

export default remoteFetchJSON
