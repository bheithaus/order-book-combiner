import redis from 'redis'
import remoteFetchJSON from './remote-fetch-json'

// set extremely high for development purposes
const CACHE_EXPIRE_TIME_SECONDS = process.env.REDIS_CACHE_EXPIRE_TIME_SECONDS || 60 * 2000

const redisConnectionOptions = process.env.NODE_ENV === 'production'
  ? { url: process.env.REDIS_URL }
  : { port: 6379 }

const redisClient = redis.createClient(redisConnectionOptions)

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

        remoteFetchJSON(url, ({ data, error }) => {
          if (error) {
            reject(error)
          } else {
            redisClient.set(url, JSON.stringify(data), 'EX', CACHE_EXPIRE_TIME_SECONDS)
            resolve(data)
          }
        })
      } else {
        resolve(JSON.parse(cachedData))
      }
    });
  });
}

export default getDataFromCacheOrRemote
