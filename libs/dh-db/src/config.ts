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
  const env: string = process.env.NODE_ENV;
  switch (env) {
    case 'test':
      config.connectionString = 'mongodb://localhost:27017';
      break;
    case 'local':
      config.connectionString = 'mongodb://localhost:27017';
      break;
    case 'staging': 
      config.connectionString = 'mongodb+srv://investproject:1vU4p7nqTqwHRQRj@cluster0.7uv8ddd.mongodb.net/?retryWrites=true&w=majority'
      break;
    case 'production':
      config.connectionString = 'mongodb+srv://investproject:1vU4p7nqTqwHRQRj@cluster0.7uv8ddd.mongodb.net/?retryWrites=true&w=majority'
      break;
  }
}

export default config;
