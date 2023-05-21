import { modelOptions } from '@typegoose/typegoose/lib/modelOptions';
import { Types } from 'mongoose';

@modelOptions({
  schemaOptions: {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
})
export abstract class TypegooseBase<T = any> {
  id: Types.ObjectId;
  _id: Types.ObjectId;
  __v?: number;
  __t?: string | number;

  constructor(data: Partial<T> | any = {}) {
    Object.assign(this, data);
  }
}

@modelOptions({
  schemaOptions: {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
})
export abstract class TypegooseBaseWithTimestamps<T = any> extends TypegooseBase<T> {
  createdAt?: Date;
  updatedAt?: Date;
}
