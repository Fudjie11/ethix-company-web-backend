import { MongooseDatabaseService } from './mongoose-database.service';
import config from '../config';

export class DatabaseService {
  public static database = new MongooseDatabaseService(config.connectionString, config.connectionOptions);
  public static get mongooseConnection() {
    return this.database.mongooseConnection;
  }
}
