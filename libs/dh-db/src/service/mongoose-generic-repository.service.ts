import { DocumentType, getModelForClass } from '@typegoose/typegoose';
import {
  Connection,
  ModelOptions,
  ModelUpdateOptions,
  QueryFindOneAndUpdateOptions,
  SaveOptions,
  Types
} from 'mongoose';
import { RequestContextService } from '../../../../src/shared/service/request-context/request-context.service';

export class MongooseGenericRepositoryService<T> {
  public get model() {
    const self = this;
    return getModelForClass(this.targetModelClass, {
      get existingConnection() {
        return self.mongooseConnection;
      }
    });
  }

  constructor(public targetModelClass: new (...args: any) => T, public mongooseConnection: Connection) {
    this.mongooseConnection.models[targetModelClass.name] = this.model;
  }

  /**
   * Creates a new document, saves and returns it, based on the given object.
   */
  async create(input: Partial<T> = {}, saveOptions?: SaveOptions): Promise<DocumentType<T>> {
    if (saveOptions && !saveOptions.session && this.contextTransactionSession) {
      saveOptions.session = this.contextTransactionSession;
    }

    const ObjectId = Types.ObjectId;

    const doc = new this.model(input);
    doc._id = new ObjectId();

    return await doc.save(saveOptions).then(function() {
      return doc;
    });
  }

  /**
   * Searches for (a) Document(s) based on the given Query
   */
  find(
    query: any = {},
    {
      select,
      populate,
      limit,
      skip,
      sort
    }: {
      select?: Object,
      populate?: (string | Object)[],
      limit?: number,
      skip?: number,
      sort?: Object,
    } = {}
  ) {
    const result = this.model.find(query);

    if (select) {
      result.select(select);
    }
    if (limit) {
      result.limit(limit);
    }
    if (skip) {
      result.skip(skip);
    }

    if (populate) {
      this.populateQuery(result, populate);
    }

    if (sort) {
      result.sort(sort);
    }

    return result;
  }

  /**
   * Searches for (a) Document(s) based on the given Query
   */
  findOne(
    query: any = {},
    {
      select,
      populate,
      limit,
      skip,
      sort
    }: {
      select?: any,
      populate?: (string | Object)[],
      limit?: number,
      skip?: number,
      sort?: Object,
    } = {}
  ) {
    const result = this.model.findOne(query);

    if (select) {
      result.select(select);
    }
    if (limit) {
      result.limit(limit);
    }
    if (skip) {
      result.skip(skip);
    }

    if (populate) {
      this.populateQuery(result, populate);
    }

    if (sort) {
      result.sort(sort);
    }

    return result;
  }

  /**
   * Searches for one Document based on the ObjectID
   * Second parameter is an Options object
   */
  findByObjectId(objectId, {
    select,
    populate
  }: {
    select?: Object,
    populate?: (string | Object)[],
  } = {}) {
    return this.findOne({ _id: objectId }, { select, populate });
  }

  findAll() {
    return this.find({});
  }

  /**
   * Finds a Document by its ID, adds the new/updated values and saves it
   * This is done entirely in the Node.js app, not in the database
   */
  update(objectId, newValues: Partial<T>, updateOptions: Partial<ModelUpdateOptions> = {}) {
    if (updateOptions && !updateOptions.session && this.contextTransactionSession) {
      updateOptions.session = this.contextTransactionSession;
    }

    return this.model.updateOne({ _id: objectId }, { $set: newValues as any } as any, updateOptions);
  }

  updateAndReturnUpdatedDocument(objectId, objectToUpdate: Partial<T>, updateOptions: Partial<{ rawResult: true } & { upsert: true } & { new: true } & QueryFindOneAndUpdateOptions> = {}) {
    updateOptions.new = true;
    if (updateOptions && !updateOptions.session && this.contextTransactionSession) {
      updateOptions.session = this.contextTransactionSession;
    }

    return this.model.findByIdAndUpdate(objectId, { $set: objectToUpdate as any } as any, updateOptions);
  }

  upsert(query: any, objectToUpsert: Partial<T>, updateOptions: Partial<ModelUpdateOptions> = {}) {
    updateOptions.upsert = true;
    if (updateOptions && !updateOptions.session && this.contextTransactionSession) {
      updateOptions.session = this.contextTransactionSession;
    }

    return this.model.updateOne(query, { $set: objectToUpsert as any } as any, updateOptions);
  }

  upsertAndReturnUpdatedDocument(query, objectToUpsert: Partial<T>, updateOptions: Partial<{ rawResult: true } & { upsert: true } & { new: true } & QueryFindOneAndUpdateOptions> = {}) {
    updateOptions.new = true;
    updateOptions.upsert = true;
    if (updateOptions && !updateOptions.session && this.contextTransactionSession) {
      updateOptions.session = this.contextTransactionSession;
    }

    return this.model.findOneAndUpdate(query, { $set: objectToUpsert as any } as any, updateOptions);
  }

  updateOneByQuery(query: any, objectToUpdate: Partial<T>, updateOptions: Partial<ModelUpdateOptions> = {}) {
    if (updateOptions && !updateOptions.session && this.contextTransactionSession) {
      updateOptions.session = this.contextTransactionSession;
    }

    return this.model.updateOne(query, { $set: objectToUpdate as any } as any, updateOptions);
  }

  updateOneByQueryAndReturnUpdatedDocument(query: any, objectToUpdate: Partial<T>, updateOptions: Partial<ModelUpdateOptions> = {}) {
    if (updateOptions && !updateOptions.session && this.contextTransactionSession) {
      updateOptions.session = this.contextTransactionSession;
    }

    return this.model.findOneAndUpdate(query, { $set: objectToUpdate as any } as any, updateOptions);
  }

  updateManyByQuery(query: any, objectToUpdate: Partial<T>, updateOptions: Partial<ModelUpdateOptions> = {}) {
    if (updateOptions && !updateOptions.session && this.contextTransactionSession) {
      updateOptions.session = this.contextTransactionSession;
    }

    return this.model.updateMany(query, { $set: objectToUpdate as any } as any, updateOptions);
  }

  /**
   * Removes a document based on the given ObjectID
   */
  remove(objectId, options: ModelOptions = {}) {
    return this.model.deleteOne({ _id: objectId }, options);
  }

  private populateQuery(query, populate) {
    if (populate.constructor === String || populate.constructor === Object) {
      query.populate(populate);
    } else if (populate.constructor === Array) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < populate.length; i++) {
        query.populate(populate[i]);
      }
    }
  }

  private contextTransactionSessionKey = 'MONGOOSE_GENERIC_REPOSITORY_TRANSACTION_SESSION'; // must be the same as MongooseRepositoryTransactionService.contextTransactionSessionKey

  private get contextTransactionSession() {
    return RequestContextService.has(this.contextTransactionSessionKey) && RequestContextService.get(this.contextTransactionSessionKey);
  }
}
