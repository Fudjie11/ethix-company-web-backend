import { MongooseSeedService } from '../service/mongoose-seed.service';

export class MongooseSeed {
  public requiredDatabaseVersion?: number;
  public maxDatabaseVersion?: number;
  public changesCount: number = 0;

  async run(currentDatabaseVersion: number) {
    // tslint:disable: max-line-length
    if (this.requiredDatabaseVersion === undefined || this.requiredDatabaseVersion === currentDatabaseVersion || (this.maxDatabaseVersion !== undefined && currentDatabaseVersion <= this.maxDatabaseVersion)) {
      await this.seed();
    } else {
      // tslint:disable-next-line:no-console
      console.log(`[DB SEED] Execution skipped ${this.constructor.name}${this.requiredDatabaseVersion !== undefined ? ` requiredDatabaseVersion: ${this.requiredDatabaseVersion}` : ''}${this.maxDatabaseVersion !== undefined ? ` maxDatabaseVersion: ${this.maxDatabaseVersion}` : ''}`);
    }
  }

  hasChanges() {
    return this.changesCount > 0;
  }

  protected async seed() {
    throw new Error('Please implement ' + this.constructor.name + ' "run" method');
  }

  public async seedRecord<TClass extends new (...args) => any, T = InstanceType<TClass>>(model: TClass, uniqueKeys: string | string[], record: Partial<T>) {
    const result = await MongooseSeedService.seedRecord(model, uniqueKeys, record);
    if (result.executed) {
      this.changesCount++;
    }

    return result;
  }

  public async seedRecordWithCustomCondition<TClass extends new (...args) => any, T = InstanceType<TClass>>(model: TClass, condition: any, record: Partial<T>) {
    const result = await MongooseSeedService.seedRecordWithCustomCondition(model, condition, record);
    if (result.executed) {
      this.changesCount++;
    }

    return result;
  }

  public async seedUpdateRecordWithCustomCondition<TClass extends new (...args) => any, T = InstanceType<TClass>>(model: TClass, condition: any, record: Partial<T>) {
    const result = await MongooseSeedService.seedUpdateRecordWithCustomCondition(model, condition, record);
    if (result.executed) {
      this.changesCount++;
    }

    return result;
  }
}
