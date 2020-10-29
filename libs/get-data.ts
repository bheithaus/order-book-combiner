import redis from 'redis'
import remoteFetchJSON from './remote-fetch-json'

// set extremely high for development purposes
const CACHE_EXPIRE_TIME_SECONDS = process.env.CACHE_EXPIRE_TIME_SECONDS || 60 * 2000

// TODO - make this idiomatic Typescript
const PORT_REDIS = 6379
const redisClient = redis.createClient({ port: PORT_REDIS })

/**
 *
 * @param  {string}       url request url
 * @return {Promise<any>}     Promise - resolves with data
 */
function getDataFromCacheOrRemote(url: string): Promise<any> {

  return new Promise((resolve: Function, reject: Function) => {
    redisClient.get(url, (error: any, cachedData: string | null) => {
      if (error) {
        console.log(error)
        reject(error)
      } else if (!cachedData) {
        console.log('request from API:', url)
        remoteFetchJSON(url, (freshData) => {
          redisClient.set(url, JSON.stringify(freshData), 'EX', CACHE_EXPIRE_TIME_SECONDS)
          resolve(freshData)
        })
      } else {
        resolve(JSON.parse(cachedData))
      }
    });
  }).catch((err : any) => {
    console.log(err)
  });
}

export default getDataFromCacheOrRemote
