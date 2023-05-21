import { SessionOptions, TransactionOptions } from 'mongodb';
import { ClientSession, Connection } from 'mongoose';
import { AsyncContextService } from '../../../../src/shared/service/request-context/async-context.service';
import { RequestContextService } from '../../../../src/shared/service/request-context/request-context.service';

export class MongooseRepositoryTransactionService {
  private contextTransactionSessionKey = 'MONGOOSE_GENERIC_REPOSITORY_TRANSACTION_SESSION';  // must be the same as MongooseGenericRepositoryService.contextTransactionSessionKey

  private set contextTransactionSession(dbSession: ClientSession) {
    RequestContextService.set(this.contextTransactionSessionKey, dbSession);
  }

  constructor(private mongooseConnection: Connection) {}


  async transactionalNewSession(
    {
      fn,
      sessionOptions,
      transactionOptions,
      closeSession = true
    }: {
      fn: ({ dbSession }: { dbSession: ClientSession }) => Promise<any> | any,
      sessionOptions?: SessionOptions,
      transactionOptions?: TransactionOptions,
      closeSession?: boolean,
    }
  ) {
    const dbSession = await this.mongooseConnection.startSession(sessionOptions);

    return await this.wrapTransactional({ dbSession, closeSession, fn, transactionOptions });
  }

  async transactional(
    {
      fn,
      dbSession,
      transactionOptions,
      closeSession = false
    }: {
      fn: ({ dbSession }: { dbSession: ClientSession }) => Promise<any> | any,
      dbSession: ClientSession,
      transactionOptions?: TransactionOptions,
      closeSession?: boolean,
    }
  ) {
    return await this.wrapTransactional({ dbSession, closeSession, fn, transactionOptions });
  }

  async wrapTransactional(
    {
      fn,
      dbSession,
      transactionOptions,
      closeSession = false
    }: {
      fn: ({ dbSession }: { dbSession: ClientSession }) => Promise<any> | any
      dbSession: ClientSession,
      transactionOptions?: TransactionOptions,
      closeSession?: boolean,
    }
  ) {
    await AsyncContextService.initContextAndWrapAsyncMethod(async () => {
      try {
        this.contextTransactionSession = dbSession;
        return await dbSession.withTransaction(() => fn({ dbSession }), transactionOptions);
      } finally {
        if (closeSession) {
          dbSession.endSession();
        }
      }
    })();
  }
}
