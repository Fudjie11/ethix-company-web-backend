import { Permission } from '../entities/role-permission/permission';
import { Role } from '../entities/role-permission/role';
import { MongooseSeed } from '../model/mongoose.seed';
import { RepositoryService } from '../service/repository/repository.service';

export class RolePermissionSeed extends MongooseSeed {
  requiredDatabaseVersion = 0;
  mongoose = require('mongoose');

  private adminPermissions: any[] = [
  //#region admin.article
  {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'article.create',
    name: 'Create Article',
    permissionGroup: 'Article',
    description: 'Permission for Admin user to Create Article',
    isActive: true,
  }, {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'article.view',
    name: 'View Article',
    permissionGroup: 'Article',
    description: 'Permission for Admin user to Read Article',
    isActive: true,
  }, {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'article.update',
    name: 'Update Article',
    permissionGroup: 'Article',
    description: 'Permission for Admin user to Update Article',
    isActive: true,
  }, {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'article.delete',
    name: 'Delete Article',
    permissionGroup: 'Article',
    description: 'Permission for Admin user to Delete Article',
    isActive: true,
  },
  //#endregion

  //#region admin.article_category
  {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'article-category.create',
    name: 'Create Article Category',
    permissionGroup: 'Article Category',
    description: 'Permission for Admin user to Create Article Category',
    isActive: true,
  }, {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'article-category.view',
    name: 'View Article Category',
    permissionGroup: 'Article Category',
    description: 'Permission for Admin user to View Article Category',
    isActive: true,
  }, {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'article-category.update',
    name: 'Update Article Category',
    permissionGroup: 'Article Category',
    description: 'Permission for Admin user to Update Article Category',
    isActive: true,
  }, {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'article-category.delete',
    name: 'Delete Article Category',
    permissionGroup: 'Article Category',
    description: 'Permission for Admin user to Delete Article Category',
    isActive: true,
  },
  //#endregion

  //#region admin.tag
  {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'tag.create',
    name: 'Create Tag',
    permissionGroup: 'Tag',
    description: 'Permission for Admin user to Create Tag',
    isActive: true,
  }, {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'tag.view',
    name: 'View Tag',
    permissionGroup: 'Tag',
    description: 'Permission for Admin user to View Tag',
    isActive: true,
  }, {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'tag.update',
    name: 'Update Tag',
    permissionGroup: 'Tag',
    description: 'Permission for Admin user to Update Tag',
    isActive: true,
  }, {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'tag.delete',
    name: 'Delete Tag',
    permissionGroup: 'Tag',
    description: 'Permission for Admin user to Delete Tag',
    isActive: true,
  },
  //#endregion

  //#region admin.location
  {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'location.create',
    name: 'Create Location',
    permissionGroup: 'Location',
    description: 'Permission for Admin user to Create Location',
    isActive: true,
  }, {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'location.view',
    name: 'View Location',
    permissionGroup: 'Location',
    description: 'Permission for Admin user to View Location',
    isActive: true,
  }, {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'location.update',
    name: 'Update Location',
    permissionGroup: 'Location',
    description: 'Permission for Admin user to Update Location',
    isActive: true,
  }, {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'location.delete',
    name: 'Delete Location',
    permissionGroup: 'Location',
    description: 'Permission for Admin user to Delete Location',
    isActive: true,
  },
  //#endregion

  //#region admin.warehouse
  {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'warehouse.create',
    name: 'Create Warehouse',
    permissionGroup: 'Warehouse',
    description: 'Permission for Admin user to Create Warehouse',
    isActive: true,
  }, {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'warehouse.view',
    name: 'View Warehouse',
    permissionGroup: 'Warehouse',
    description: 'Permission for Admin user to View Warehouse',
    isActive: true,
  }, {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'warehouse.update',
    name: 'Update Warehouse',
    permissionGroup: 'Warehouse',
    description: 'Permission for Admin user to Update Warehouse',
    isActive: true,
  }, {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'warehouse.delete',
    name: 'Delete Warehouse',
    permissionGroup: 'Warehouse',
    description: 'Permission for Admin user to Delete Warehouse',
    isActive: true,
  },
  //#endregion
    
  //#region role
  {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'role.create',
    name: 'Create Role',
    permissionGroup: 'Role',
    description: 'Permission for Admin user to Create Role',
    isActive: true,
  }, {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'role.view',
    name: 'View Role',
    permissionGroup: 'Role',
    description: 'Permission for Admin user to View Role',
    isActive: true,
  }, {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'role.update',
    name: 'Update Role',
    permissionGroup: 'Role',
    description: 'Permission for Admin user to Update Role',
    isActive: true,
  }, {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'role.delete',
    name: 'Delete Role',
    permissionGroup: 'Role',
    description: 'Permission for Admin user to Delete Role',
    isActive: true,
  },
  //#endregion

  //#region user
  {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'user.create',
    name: 'Create User',
    permissionGroup: 'User',
    description: 'Permission for Admin user to Create User',
    isActive: true,
  }, {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'user.view',
    name: 'View User',
    permissionGroup: 'User',
    description: 'Permission for Admin user to View User',
    isActive: true,
  }, {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'user.update',
    name: 'Update User',
    permissionGroup: 'User',
    description: 'Permission for Admin user to Update User',
    isActive: true,
  }, {
    _id: this.mongoose.mongo.ObjectId(),
    code: 'user.delete',
    name: 'Delete User',
    permissionGroup: 'User',
    description: 'Permission for Admin user to Delete User',
    isActive: true,
  },
  //#endregion
  ];


  private adminRole: any = {
    name: 'admin',
    description: 'Has access to all admin user permission',
    isActive: true,
    permissionIds: this.adminPermissions.map(x => x._id),
    // permissions: this.adminPermissions,
  };

  protected async seed() {
    for (const adminPermission of this.adminPermissions) {
      await this.seedPermission(adminPermission);
    }

    await this.seedRole(this.adminRole);
  }

  private async seedPermission(permission: any) {
    return (await this.seedRecord(RepositoryService.permission.model, '_id', new Permission(permission))).finalRecord;
  }

  private async seedRole(role: any) {
    return (await this.seedRecord(RepositoryService.role.model, 'name', new Role(role))).finalRecord;
  }
}
