import { modelOptions, prop } from '@typegoose/typegoose';
import { TypegooseBaseWithTimestamps } from '../../service/typegoose-base';

@modelOptions({
  schemaOptions: {
    collection: 'Token',
    timestamps: {
      createdAt: true,
      updatedAt: true
    },
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
})

export class Token extends TypegooseBaseWithTimestamps<Token> {
  @prop() accessToken: string;
  @prop() accessTokenExpiresAt: Date;
  @prop() refreshToken: string;
  @prop() refreshTokenExpiresAt: Date;
  @prop() user: object
  @prop() client: object
  @prop() roleAccess: string[];
}
