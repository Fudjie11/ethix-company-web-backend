import { ModelType } from '@typegoose/typegoose/lib/types';
import { castArray, get } from 'lodash';
import { Connection } from 'mongoose';
import { MongooseSeed } from '../model/mongoose.seed';

export class MongooseSeedService {
  private static seedMetadataCollectionName = 'SeedMetadata';

  public static async run(mongooseConnection: Connection, seedClasses: (new(...args) => MongooseSeed)[]) {
    let dbVersion = await this.getDbVersion(mongooseConnection);

    // tslint:disable-next-line:no-console
    console.log(`[DB SEED] Running seed with current database version: ${dbVersion}`);

    let seedChangesCount = 0;
    for (const seedClass of seedClasses) {
      const seed = new seedClass();

      try {
        // tslint:disable-next-line:no-console
        console.log(`[DB SEED] Executing seed ${seedClass.name}`);

        await seed.run(dbVersion);
        if (seed.hasChanges()) {
          seedChangesCount = seedChangesCount + seed.changesCount;
        }

        // tslint:disable-next-line:no-console
        console.log(`[DB SEED] Finished seed ${seedClass.name}, changes count: ${seed.changesCount}`);
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(`[DB SEED] Failed seeding ${seedClass.name}}`);
        // tslint:disable-next-line:no-console
        console.error(e);
      }
    }

    if (seedChangesCount > 0) {
      dbVersion = dbVersion + 1;

      // tslint:disable-next-line:no-console
      console.log(`[DB SEED] Seeds finished with total changes: ${seedChangesCount}, increasing dbVersion to ${dbVersion}`);

      await this.saveDbVersion(mongooseConnection, dbVersion);
    } else {
      // tslint:disable-next-line:no-console
      console.log(`[DB SEED] Seeds finished with no changes`);
    }
  }

  // tslint:disable: max-line-length
  public static async seedRecord<TClass extends new (...args) => any, T = InstanceType<TClass>>(model: TClass, uniqueKeys: string | string[], record: Partial<T>, update: boolean = false) {
    uniqueKeys = castArray(uniqueKeys);

    const result: {
      executed: boolean;
      finalRecord: T;
    } = {
      executed: false,
      finalRecord: null
    };

    const whereItems = [];
    for (const key of uniqueKeys) {
      const keyValue = get(record, key);
      if (keyValue) {
        whereItems.push({ [key]: keyValue });
      }
    }

    const existingRecord = await (model as any as ModelType<T>).findOne().and(whereItems);
    if (!existingRecord) {
      result.finalRecord = await (model as any as ModelType<T>).create(record as any);
      result.executed = true;
    } else {
      if (update) {
        Object.assign(existingRecord, record);
        await existingRecord.save();
      }
      result.finalRecord = existingRecord;
    }

    return result;
  }

  public static async seedRecordWithCustomCondition<TClass extends new (...args) => any, T = InstanceType<TClass>>(model: TClass, customCondition: any, record: Partial<T>, update: boolean = false) {
    const result: {
      executed: boolean;
      finalRecord: T;
    } = {
      executed: false,
      finalRecord: null
    };

    const existingRecord = await (model as any as ModelType<T>).findOne(customCondition);
    if (!existingRecord) {
      result.finalRecord = await (model as any as ModelType<T>).create(record as any);
      result.executed = true;
    } else {
      if (update) {
        Object.assign(existingRecord, record);
        await existingRecord.save();
      }
      result.finalRecord = existingRecord;
    }

    return result;
  }

  public static async seedUpdateRecordWithCustomCondition<TClass extends new (...args) => any, T = InstanceType<TClass>>(model: TClass, customCondition: any, record: Partial<T>) {
    const result: {
      executed: boolean;
      finalRecord: T;
    } = {
      executed: false,
      finalRecord: null
    };

    const existingRecord = await (model as any as ModelType<T>).findOne(customCondition);
    if (existingRecord) {
      Object.assign(existingRecord, record);
      await existingRecord.save();
      result.finalRecord = existingRecord;
      result.executed = true;
    }

    return result;
  }

  private static async getDbVersion(mongooseConnection: Connection) {
    const seedMetadataCollection = await mongooseConnection.collection(this.seedMetadataCollectionName);
    const seedMetadata = await seedMetadataCollection.findOne({});
    if (seedMetadata && seedMetadata.dbVersion) {
      return seedMetadata.dbVersion;
    }
    return 0;
  }

  private static async saveDbVersion(mongooseConnection: Connection, targetDbVersion: number) {
    const seedMetadataCollection = await mongooseConnection.collection(this.seedMetadataCollectionName);
    await seedMetadataCollection.findOneAndReplace({}, {
      dbVersion: targetDbVersion
    }, {
      upsert: true
    });
  }
}
