import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum ClientGrants {
  PASSWORD = 'password',
  REFRESH_TOKEN = 'refresh_token',
  CLIENT_CREDENTIALS = 'client_credentials',
}

export class LoginVM {
  // tslint:disable: variable-name
  @ApiProperty()
  client_id: string;

  @ApiProperty()
  client_secret: string;

  @ApiProperty({type: 'string', enum: [ClientGrants.PASSWORD , ClientGrants.REFRESH_TOKEN, ClientGrants.CLIENT_CREDENTIALS]})
  grant_type: ClientGrants.PASSWORD | ClientGrants.REFRESH_TOKEN | ClientGrants.CLIENT_CREDENTIALS;

  @ApiPropertyOptional()
  username?: string;

  @ApiPropertyOptional()
  password?: string;

  @ApiPropertyOptional()
  refresh_token?: string;
}
