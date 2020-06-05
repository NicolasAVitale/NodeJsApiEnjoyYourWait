const currentEnv = process.env.ENV || 'prod'

const envs = {
  prod: {
    port: process.env.PROD_PORT,
    // mode: process.env.PROD_MODE,
    mode: "db",
    db: {
      user: process.env.PROD_MSSQL_DB_USER,
      password: process.env.PROD_MSSQL_DB_PASS,
      database: process.env.PROD_MSSQL_DB_DATABASE,
      server: process.env.PROD_MSSQL_DB_HOST,
      client: process.env.PROD_DB_CLIENT,
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      },
      options: {
        encrypt: false,
        enableArithAbort: true
      }
    }
  },
  dev: {
    port: process.env.DEV_PORT,
    mode: process.env.DEV_MODE,
    db: {
      client: process.env.DEV_DB_CLIENT,
      dbPath: process.env.DEV_DB_PATH
    }
  }
}

const config = {
  port: envs[currentEnv].port,
  mode: envs[currentEnv].mode,
  db: envs[currentEnv].db,
  debugLevel: process.env.DEBUG_LEVEL || 5
}

export default config