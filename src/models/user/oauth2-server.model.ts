import * as _ from 'lodash'
import { ForbiddenException, BadRequestException } from '@nestjs/common';
import { RepositoryService } from '../../../libs/dh-db/src/service/repository/repository.service';
import { PasswordService } from '../../shared/service/common/password.service';
import { User } from '../../../libs/dh-db/src/entities/credential/user';

export class OAuth2Model {
  public static async getAccessToken (accessToken) {
    return await RepositoryService.token.findOne({ accessToken })
  }

  public static async getClient (clientId, clientSecret) {
    const client = await RepositoryService.client.findOne({
      clientId,
      clientSecret
    })
    if (!client) throw new ForbiddenException('Client not found');

    const grants = client.grants.map((grant: any) => {
      if (typeof(grant) === 'string') {
        return grant;
      }
      if (typeof(grant) === 'object' && grant.length === 1 ) {
        return grant[0]
      }
    });

    return {
      id: client.id,
      clientId: client.clientId,
      clientSecret: client.clientSecret,
      grants
    }
  }

  public static async getUser (email: string, password: string) {
    const user = await RepositoryService.user.findOne({ email }).lean();
    if (!user) throw new BadRequestException('user not found')

    const isPasswordValid = PasswordService.validate(user, password)
    if (!isPasswordValid) throw new BadRequestException(`Invalid Password`)

    return {
      id: user._id,
      fullName: user.name,
      email: user.email,
      isVerified: user.emailConfirmed
    }
  }

  public static async saveToken (token, client, user) {
    const data = {
      accessToken: token.accessToken,
      accessTokenExpiresAt: new Date(token.accessTokenExpiresAt),
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: new Date(token.refreshTokenExpiresAt),
      client,
      user,
      // roleAccess: getRoleAccessFromUser(user)
    }
    await RepositoryService.token.create(data)
    return data
  }

  public static async revokeToken (token) {
    return await RepositoryService.token.model.deleteOne({
      accessToken: token.accessToken
    })
  }

  public static async getRefreshToken (refreshToken) {
    return await RepositoryService.token.findOne({ refreshToken })
  }
}

// map role access to array of string
const getRoleAccessFromUser = (user: User) => {
  const roleAccess = []
  if (_.get(user, 'role.roleAccess')) {
    const rAccess = _.get(user, 'role.roleAccess')
    Object.keys(rAccess).map(keyLv1 => {
      Object.keys(rAccess[keyLv1]).map(keyLv2 => {
        if (rAccess[keyLv1][keyLv2] === true) {
          roleAccess.push(`${keyLv1}.${keyLv2}`)
        }
      })
    })
  }
  return roleAccess
}
