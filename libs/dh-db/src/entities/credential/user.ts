import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Schema, Types } from 'mongoose';
import { Gender } from '../../../../../src/shared/enum/gender';
import { File } from '../file/file';
import { Role } from '../role-permission/role';
import crypto = require('crypto');

@modelOptions({
    schemaOptions: {
        collection: 'User',
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
    },
})
export class User {
    @prop()
    username: string;

    @prop({ required: true, unique: true })
    email: string;

    @prop({ type: Schema.Types.Boolean, default: false })
    emailConfirmed: boolean;

    @prop({ type: Schema.Types.String })
    phoneNumber: string;

    @prop({ type: Schema.Types.Boolean, default: false })
    phoneNumberConfirmed: boolean;

    @prop({ required: true })
    _password: string;

    @prop({ required: true })
    _passwordSalt: string;

    @prop({})
    name: string;

    @prop()
    lastLogin: Date;

    @prop({ type: Schema.Types.String })
    gender: Gender;

    @prop()
    imageId: Types.ObjectId;

    @prop({
        ref: File.name,
        localField: 'imageId',
        foreignField: '_id',
        justOne: true,
    })
    image: Ref<File>;

    @prop()
    roleId: Types.ObjectId;

    @prop({
        ref: Role,
        localField: 'roleId',
        foreignField: '_id',
        justOne: true,
    })
    role: Ref<Role>;

    @prop({ type: Schema.Types.Boolean, default: true })
    isActive: boolean;

    set password(newPassword: string) {
      this._passwordSalt = crypto.randomBytes(16).toString('hex');
      this._password = crypto.pbkdf2Sync(newPassword, this._passwordSalt, 10000, 512, 'sha512').toString('hex');
    }

    get password() {
      return this._password;
    }

    verifyPassword(targetPassword: string) {
      const hash = crypto.pbkdf2Sync(targetPassword, this._passwordSalt, 10000, 512, 'sha512').toString('hex');
      return this._password === hash;
    }

    setPassword(newPassword: string) {
      const _passwordSalt = crypto.randomBytes(16).toString('hex');
      const _password = crypto.pbkdf2Sync(newPassword, _passwordSalt, 10000, 512, 'sha512').toString('hex');
      //
      return {'password': _password, 'passwordSalt': _passwordSalt};
    }
}
