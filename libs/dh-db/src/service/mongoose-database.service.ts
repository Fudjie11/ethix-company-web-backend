import { Connection, ConnectionOptions } from 'mongoose';

export class MongooseDatabaseService {
  // tslint:disable-next-line: variable-name
  public mongooseConnection: Connection;

  constructor(databaseConnectionString: string, databaseConnectionOptions?: ConnectionOptions) {
    // tslint:disable-next-line:no-console
    console.log(`CONNECTING DATABASE TO ${databaseConnectionString} WITH OPTIONS`, databaseConnectionOptions);

    this.mongooseConnection = require('mongoose').createConnection(
      databaseConnectionString,
      databaseConnectionOptions,
    );
  }
}
