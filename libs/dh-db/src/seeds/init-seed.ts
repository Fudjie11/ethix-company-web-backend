import { Gender } from '../../../../src/shared/enum/gender';
import { EnvironmentService } from '../../../../src/shared/service/config/environment.service';
import { Client, ClientGrants } from '../entities/client/client';
import { User } from '../entities/credential/user';
import { MongooseSeed } from '../model/mongoose.seed';
import { RepositoryService } from '../service/repository/repository.service';

export class InternalDevSeed extends MongooseSeed {
  requiredDatabaseVersion = 0;
  private finalUserTest1: User;
  private finalClient: Client;

  public async seed() {
    if (EnvironmentService.get('SEED_DISABLE_INTERNAL_DEV', true) && EnvironmentService.NODE_ENV === 'production') {
      // tslint:disable-next-line:no-console
      console.log(`[DB SEED] Skipping ${this.constructor.name} due to an environment condition`);
      return;
    }

    const userModelClass = RepositoryService.user.model;
    const role = await RepositoryService.role.findOne({ name: "admin" }).lean();

    const userTest1 = new userModelClass();
    userTest1.username = 'admin';
    userTest1.email = 'admin.dev@gmail.com';
    userTest1.password = 'admin123';
    userTest1.emailConfirmed = true;
    userTest1.name = 'admin';
    userTest1.gender = Gender.MALE;
    userTest1.isActive = true;
    userTest1.phoneNumber = '080192243424';
    userTest1.phoneNumberConfirmed = true;
    userTest1.roleId =  role._id 

    const { finalRecord: finalUserTest1 } = await this.seedRecord(
      RepositoryService.user.model,
      ['email'],
      userTest1
    );
    this.finalUserTest1 = finalUserTest1;

    await this.seedClient();
  }

  private async seedClient() {
    const userModelClass = RepositoryService.client.model;
    const client = new userModelClass();
    client.clientId = 'ethix-admin';
    client.clientSecret = '3thix4dmin';
    client.grants = [ClientGrants.CLIENT_CREDENTIALS, ClientGrants.PASSWORD, ClientGrants.REFRESH_TOKEN]

    const { finalRecord: finalClient } = await this.seedRecord(
      RepositoryService.client.model,
      ['clientId'],
      client
    );
    this.finalClient = finalClient;
  }
}
