import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Schema, Types } from 'mongoose';
import { File } from '../file/file';
import { Location } from '../location/location'

@modelOptions({
  schemaOptions: {
    collection: 'Warehouse',
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

export class Warehouse {
  @prop({ type: Schema.Types.String, required: true, index: true })
  name: string;

  @prop({ type: Schema.Types.Boolean, default: true })
  isActive: boolean;

  @prop({ ref: File, localField: 'mainImageId', foreignField: '_id', justOne: true }) 
  mainImage: Ref<File>;
  
  @prop({ type: Schema.Types.String, required: true })
  address: string;

  @prop({ type: Types.ObjectId, index: true }) locationId: Types.ObjectId;
  @prop({ ref: Location, localField: 'locationId', foreignField: '_id', justOne: true }) location: Location;

  @prop({ type: Schema.Types.Number, required: true })
  warehouseArea: number;
  
  @prop({ type: Schema.Types.String, required: true })
  sqmInventory: string;
  
  @prop({ type: Schema.Types.String, required: true })
  operationalTimes: string[];

  @prop({ type: Schema.Types.String, required: true })
  fileUrls: string[];
}
