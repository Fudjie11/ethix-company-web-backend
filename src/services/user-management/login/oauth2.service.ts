// import * as OAuth2Server from 'oauth2-server'
import * as _ from 'lodash';
import { OAuth2Model } from '../../../models/user/oauth2-server.model';

import OAuth2Server = require('oauth2-server');
import { ServerOptions } from 'oauth2-server';
import { RepositoryService } from '../../../../libs/dh-db/src/service/repository/repository.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
const { Request, Response } = OAuth2Server

const options: ServerOptions = {
  model: (OAuth2Model as any),
  accessTokenLifetime: 60 * 60 * 24, // 1 day
  refreshTokenLifetime: 60 * 60 * 24 * 7, // 1 week
  allowBearerTokensInQueryString: true
};
const oAuth2 = new OAuth2Server(options);

// const oAuth2 = new OAuth2Server({
//   model: (OAuth2Model as any),
//   accessTokenLifetime: 60 * 60 * 24, // 1 day
//   refreshTokenLifetime: 60 * 60 * 24 * 7, // 1 week
//   allowBearerTokensInQueryString: true
// })

export class OAuth2Service {
  constructor(
    private jwtService: JwtService
  ) { }

  public async obtainToken(req, res, isNewUser?: boolean) {

    // handle empty string scope on postman
    if (_.get(req, 'body.scope') === '') {
      delete req.body.scope;
    }

    if (req.headers['content-type'] !== 'application/x-www-form-urlencoded') {
      req.headers['content-type'] = 'application/x-www-form-urlencoded';
    }

    const payload = req.body;
    const dataUser = await OAuth2Service.login(payload.username);
   
    if (payload.client_id === 'ethix-admin') {
      const userRole = dataUser.role;
      const permissions = userRole.permissions.map(prm => prm.code)
      const tokenJwt = await this.generateTokenJwt({ email: payload.username, permissions });

      const request = new Request(req)
      const response = new Response(res)
      const tokenData = await oAuth2.token(request, response)
      const token = Object.assign({}, tokenData, {
        accessToken: tokenJwt,
        access_token: tokenJwt,
        access_permissions: permissions,
        isNewUser
      });
      delete token.accessTokenExpiresAt;
      delete token.refreshToken;
      delete token.refreshTokenExpiresAt;
      res.json(token)
      return;
    } else {
      const dataUser = await OAuth2Service.checkUser(payload.username);

      if (!dataUser) {
        const error = {
          statusCode: 400,
          message: 'Account not found',
          error: 'Unauthorized'
        }
        res.status(400).json(error);
        return;
      }

      const request = new Request(req)
      const response = new Response(res)
      const tokenData = await oAuth2.token(request, response)
      const token = Object.assign({}, tokenData, {
        access_token: tokenData.accessToken,
        isNewUser
      });
      delete token.accessTokenExpiresAt;
      res.json(token)
      return;

    }
  }

  public async generateTokenJwt(data: { email: string, permissions: string[] }) {
    try {
      const payload = {
        email: data.email,
        permissions: data.permissions,
      };
      const token = await this.jwtService.sign(payload);
      return token;
    } catch (error) {
      throw error;
    }

  }

  public static async authenticateRequest(req, res, next) {
    const token = req.headers && req.headers.authorization ? req.headers.authorization : null;
    if (token) {
      next();
    } else {
      const error = {
        statusCode: 401,
        message: 'Invalid access token',
        error: 'Unauthorized'
      }
      res.status(401).json(error);
    }
    // const request = new Request(req)
    // const response = new Response(res)
    // try {
    //   await oAuth2.authenticate(request, response)
    //   next()
    // } catch (err) {
    //   res.status(err.code || 500).json(err)
    // }
  }

  public static async login(email: string): Promise<any> {
    return  await RepositoryService.user.model.findOne({
      email,
      isActive: true,
    }).populate({ 
      path: 'role',
      populate: {
        path: 'permissions'
      } 
   }).lean();
  }
  public static async checkUser(email: string) {
    const aggregate = [
      {
        $match: {
          email,
          isActive: true,
        },
      },
    ];

    const data = await RepositoryService.user.model.aggregate(aggregate);
    return data[0];
  }
}
