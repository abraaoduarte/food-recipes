const env = require('./src/helpers/env');

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: env('DB_HOST', '127.0.0.1'),
      user: env('DB_USER', 'root'),
      password: env('DB_PASSWORD'),
      database: env('DB_DATABASE'),
      port: env('DB_PORT'),
    },
    migrations: {
      tableName: 'migrations',
      directory: `${__dirname}/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/database/seeds`,
    },
  },
  production: {
    client: 'mysql',
    connection: {
      host: env('DB_HOST', '127.0.0.1'),
      user: env('DB_USER', 'root'),
      password: env('DB_PASSWORD'),
      database: env('DB_DATABASE'),
      port: env('DB_PORT'),
    },
    migrations: {
      tableName: 'migrations',
      directory: `${ __dirname }/database/migrations`,
    },
    seeds: {
      directory: `${ __dirname }/database/seeds`,
    },
  },
};
