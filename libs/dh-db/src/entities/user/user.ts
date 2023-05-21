// import { modelOptions, prop, Ref } from '@typegoose/typegoose';
// import { Types } from 'mongoose';
// import { TypegooseBaseWithTimestamps } from '../../service/typegoose-base';
// import { File } from '../file/file';
// import { Role } from '../role-permission/role';

// @modelOptions({
//   schemaOptions: {
//     collection: 'User',
//     timestamps: {
//       createdAt: true,
//       updatedAt: true,
//     },
//     toJSON: {
//       virtuals: true,
//     },
//     toObject: {
//       virtuals: true,
//     },
//   },
// })

// export class User extends TypegooseBaseWithTimestamps<User> {
//   @prop({})
//   username: string;

//   @prop({required: true, unique: true})
//   email: string;

//   @prop()
//   fullName: string;

//   @prop()
//   lastLogin: Date;

//   @prop({})
//   _password: string;

//   @prop({})
//   _passwordSalt: string;

//   @prop()
//   imageId: Types.ObjectId;

//   @prop({ ref: File, localField: 'imageId', foreignField: '_id', justOne: true })
//   image: Ref<File>;

//   @prop() roleId: Types.ObjectId;

//   @prop({ref: Role,  localField: 'roleId', foreignField: '_id', justOne: true })
//   role: Ref<Role>;
// }
