declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'test' | 'staging' | 'production'
    MAIl_HOST: string
    SMTP_PORT: string
    PORT: string
  }
}
