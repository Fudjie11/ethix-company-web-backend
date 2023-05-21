import { modelOptions, prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

@modelOptions({
  schemaOptions: {
    collection: 'Location',
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

export class Location {
  @prop({ type: Schema.Types.String, required: true })
  name: string;

  @prop({ type: Schema.Types.Boolean, default: true })
  isActive: boolean;
}
