import { modelOptions, prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

@modelOptions({
  schemaOptions: {
    collection: 'Tag',
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

export class Tag {
  @prop({ type: Schema.Types.String, required: true, index: true, unique: true })
  name: string;

  @prop({ type: Schema.Types.String, default: '-' })
  description: string;

  @prop({ type: Schema.Types.Boolean, default: true })
  isActive: boolean;
}
