import { Controller, Post, Req, Res, HttpCode, Get, Body, Query, BadRequestException, UseFilters } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags, ApiOkResponse, ApiConsumes } from '@nestjs/swagger'
import { LoginVM } from '../../../models/user/login/login.vm'
import { OAuth2Service } from '../../../services/user-management/login/oauth2.service'
interface LoginData {
  username: string
  password: string
}

@ApiTags('User')
@Controller('')
export class LoginController {
  constructor(
    private readonly jwtService: JwtService,
  ) {
  }
  
  @ApiConsumes('application/x-www-form-urlencoded')
  @Post('oauth2/connect/token')
  @HttpCode(200)
  @ApiOkResponse({type: LoginVM})
  async loginWeb (@Req() request, @Res() response, @Body() body: LoginVM) {
    try {
      const oAuth2Service = new OAuth2Service(this.jwtService);
      await oAuth2Service.obtainToken(request, response)
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error.message)
    }
  }
}
