import session from 'express-session';
import MongoStore from 'connect-mongo'; // redis is best but used mongodb because of deployment
import config from 'config';import dotenv from 'dotenv-safe';

dotenv.config();

const sessionConfig = session({
  secret: config.get('session.secret') as string,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: config.get('dbConfig.url') as string,
    collectionName: 'sessions',
  }),
  cookie: {
    httpOnly: process.env.NODE_ENV === 'production',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
  },
});

export default sessionConfig;
