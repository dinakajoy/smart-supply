import dotenv from 'dotenv-safe';

dotenv.config();

export default {
  environment: {
    host: process.env.HOST || '0.0.0.0',
    port: Number(String(process.env.PORT)) || 1337,
    saltWorkFactor: Number(String(process.env.SALT_GEN)) || 10,
    clientURL: String(process.env.CLIENT_URL) || 'http://localhost:1337',
  },
  dbConfig: {
    url: process.env.DATABASE_URL || '',
  },
  session: {
    secret: process.env.SECRET || 'secret',
  },
  jwt: {
    accessTokenSecret:
      process.env.ACCESS_TOKEN_SECRET || 'bJfS7tZ6fVfISS7suxqQW',
    refreshTokenSecret:
      process.env.REFRESH_TOKEN_SECRET || 'uxfVfS7bJ6sfS7tqQWTtX',
  },
  emailConfig: {
    user: process.env.EMAIL_USER || 'no-reply@smart-supply.com',
    password: process.env.EMAIL_PASS || 'QuxfVfS7bJqWTtX6sfS7t',
  },
};
