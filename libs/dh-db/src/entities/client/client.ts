import { modelOptions, prop } from '@typegoose/typegoose';

export enum ClientGrants {
  PASSWORD = 'password',
  REFRESH_TOKEN = 'refresh_token',
  CLIENT_CREDENTIALS = 'client_credentials',
}

@modelOptions({
  schemaOptions: {
    collection: 'Client',
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
export class Client {
  @prop() clientId: string;
  @prop() clientSecret: string;
  @prop() grants: string[];
}
