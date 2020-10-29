declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REDIS_CACHE_EXPIRE_TIME_SECONDS: number | undefined;
      PORT?: number | undefined;
    }
  }
}

export {}
