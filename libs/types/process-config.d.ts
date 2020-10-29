declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CACHE_EXPIRE_TIME_SECONDS: number | undefined;
      PORT?: number | undefined;
    }
  }
}

export {}
