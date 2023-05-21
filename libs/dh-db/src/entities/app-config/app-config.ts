import { modelOptions, prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

@modelOptions({
  schemaOptions: {
    collection: 'AppConfig',
  },
})

export class AppConfig {
  @prop({ type: Schema.Types.String, required: true })
  key: string;

  @prop({ type: Schema.Types.String, required: true })
  value: string;
}
