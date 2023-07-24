import { AppConfig } from '../../entities/app-config/app-config';
import { Article } from '../../entities/article/article';
import { ArticleCategory } from '../../entities/article/article-category';
import { Tag } from '../../entities/article/tag';
import { Client } from '../../entities/client/client';
import { User } from '../../entities/credential/user';
import { File } from '../../entities/file/file';
import { Permission } from '../../entities/role-permission/permission';
import { Location } from '../../entities/location/location';
import { Warehouse } from '../../entities/warehouse/warehouse';
import { Role } from '../../entities/role-permission/role';
import { Token } from '../../entities/token/token';
import { DatabaseService } from '../database.service';
import { MongooseGenericRepositoryService } from '../mongoose-generic-repository.service';
import { MongooseRepositoryTransactionService } from '../mongoose-repository-transaction.service';

export class RepositoryService {
  public static repositoryTransaction = new MongooseRepositoryTransactionService(DatabaseService.mongooseConnection);

  public static appConfig = new MongooseGenericRepositoryService(AppConfig, DatabaseService.mongooseConnection);
  public static user = new MongooseGenericRepositoryService(User, DatabaseService.mongooseConnection);
  public static token = new MongooseGenericRepositoryService(Token, DatabaseService.mongooseConnection);
  public static client = new MongooseGenericRepositoryService(Client, DatabaseService.mongooseConnection);

  public static article = new MongooseGenericRepositoryService(Article, DatabaseService.mongooseConnection);
  public static articleCategory = new MongooseGenericRepositoryService(ArticleCategory, DatabaseService.mongooseConnection);
  public static tag = new MongooseGenericRepositoryService(Tag, DatabaseService.mongooseConnection);
 
  public static file = new MongooseGenericRepositoryService(File, DatabaseService.mongooseConnection);
  public static role = new MongooseGenericRepositoryService(Role, DatabaseService.mongooseConnection);
  public static permission = new MongooseGenericRepositoryService(Permission, DatabaseService.mongooseConnection);

  public static location = new MongooseGenericRepositoryService(Location, DatabaseService.mongooseConnection);
  public static warehouse = new MongooseGenericRepositoryService(Warehouse, DatabaseService.mongooseConnection);
}