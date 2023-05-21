import { MailModule } from './../../mail/mail.module';
import { Module } from '@nestjs/common';
import { LoginController } from '../../controllers/public/user/login.controller';
import { UserManagementService } from './user.management.service';
import { OAuth2Service } from './login/oauth2.service';
import { AdminUserManagementController } from '../../controllers/admin/user/admin-user.controller';
import { JwtStrategy } from '../../guard/jwt-strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from '../../guard/jwt-constant';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false
    }),
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: {
        expiresIn: jwtConstant.expiresIn
      }
    }),
    MailModule
  ],
  controllers: [
    LoginController,
    AdminUserManagementController,
  ],
  providers: [
    UserManagementService,
    OAuth2Service,
    JwtStrategy,
  ],
  exports: [
    UserManagementService,
    OAuth2Service,
  ],
})
export class UserManagementModule {
  //
}
