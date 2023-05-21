import { ConnectionOptions } from 'mongoose';
import dotenv from 'dotenv';
class Config {
  connectionString: string;
  connectionOptions: ConnectionOptions = { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true };
}

dotenv.config()

const config = new Config();
const mongoUrl = process.env.MONGO_URL;
if (mongoUrl) {
  config.connectionString = mongoUrl;
} else {
  const env: string = 'local';
  switch (env) {
    case 'test':
      config.connectionString = 'mongodb://localhost:27017/ethixdb';
      break;
    case 'local':
      config.connectionString = 'mongodb://localhost:27017/ethixdb';
      break;
    case 'development':
      config.connectionString = 'mongodb://localhost:27017/ethixdb';
      break;
    case 'uat':
      config.connectionString = 'mongodb://localhost:27017/ethixdb'
      break;
    case 'production':
      config.connectionString = 'mongodb://localhost:27017/ethixdb'
      break;
  }
}

export default config;
