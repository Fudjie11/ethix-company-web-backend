import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { MongooseSeed } from '../model/mongoose.seed';
import { InternalDevSeed } from '../seeds/init-seed';
import { RolePermissionSeed } from '../seeds/role-permission-seed';
import { DatabaseService } from './database.service';
import { MongooseSeedService } from './mongoose-seed.service';

export class DatabaseSetupService {
  public static async setup() {
    const seedClasses = new Array<AnyParamConstructor<MongooseSeed>>(
      RolePermissionSeed,
      InternalDevSeed,
    );

    await MongooseSeedService.run(DatabaseService.mongooseConnection, seedClasses);
  }
}
