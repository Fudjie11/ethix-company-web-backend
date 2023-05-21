import { MailService } from './../../mail/mail.service';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '../../../libs/dh-db/src/entities/credential/user';
import { RepositoryService } from '../../../libs/dh-db/src/service/repository/repository.service';
import { MBaseListPayload } from '../../models/base/base-list-payload';
import { UserRegisterDto } from '../../models/user/register/user-register.dto';
import { UserTokenVm } from '../../models/user/user.token';
import { UserListPaginationVM, UserVM } from '../../models/user/user';
const ObjectId = require('mongoose').Types.ObjectId;
import moment from 'moment';
import { ConfigService } from '../../shared/service/config/config.service';
import { isEmail } from 'src/utils/validator';

@Injectable()
export class UserManagementService {
  
  constructor(private mailService: MailService) {}

  public static async createUser(payload: UserRegisterDto, isDonorUser: boolean = false) {
    const isEmailValid = isEmail(payload.email)
    if (!isEmailValid) throw new BadRequestException('Email tidak valid');

    const emailExist = await RepositoryService.user.findOne({ email: payload.email }).lean();
    if (emailExist) throw new BadRequestException('Email telah terpakai');

    const phoneExist = await RepositoryService.user.findOne({ phone: payload.phoneNumber }).lean();
    if (phoneExist) throw new BadRequestException('Nomor telepon telah terpakai');


    const user = new User();
    const generatePassword = user.setPassword(payload.password);

    const data: Partial<User> = {
      email: payload.email,
      name: payload.name,
      phoneNumber: payload.phoneNumber,
      _password: generatePassword.password,
      _passwordSalt: generatePassword.passwordSalt
    };

    try {
      await RepositoryService.user.create(data).then();
      return true;
    } catch (e) {
      throw new BadRequestException('Failed when create new user');
    }
  }

  public static async getAccessToken(token: UserTokenVm) {
    return RepositoryService.token.findOne({ 'accessToken': token.accessToken })
      .then(res => {
        if (!res) {
          throw new ForbiddenException('Token not found');
        } else {
          return res;
        }
      });
  }

  public static async createAdminUser(payload: UserRegisterDto) {
    const roleId = new ObjectId(payload.roleId);
    const roleExist = await RepositoryService.role.findByObjectId(roleId).lean();
    if (!roleExist) throw new BadRequestException('Role doesnt exist');

    const emailExist = await RepositoryService.user.findOne({ email: payload.email }).lean();
    if (emailExist) throw new BadRequestException('Email already exist');

    const user = new User();
    const generatePassword = user.setPassword(payload.password);

    const data: Partial<User> = {
      username: payload.username,
      email: payload.email,
      name: payload.name,
      phoneNumber: payload.phoneNumber,
      _password: generatePassword.password,
      _passwordSalt: generatePassword.passwordSalt,
      roleId: roleId,
    };

    try {
      await RepositoryService.user.create(data).then();
      return true;
    } catch (e) {
      throw new BadRequestException('Failed when create new user');
    }
  }

  static async findAllAdminUser(params: MBaseListPayload): Promise<UserListPaginationVM> {
    const response = new UserListPaginationVM();
    let query = {};


    if (params.type == 'user'){
      query = {
        $or: [{
          role : {
            '$size' : 1
          },
        }]
      }
    } 

    if (params.keyword) {
      query = {
        $or: [
          { name: params.keyword },
        ]
      }
    };
    query['isActive'] = true;

    const datas = await RepositoryService.user.find(query, { skip: +params.skip, limit: +params.take || 10 }).populate('role').lean();

    response.data = datas;
    response.skip = +params.skip || 0;
    response.take = +params.take || 10;
    response.total = await RepositoryService.user.model.countDocuments(query);
    return response;
  }

  static async update(id: string, payload: UserRegisterDto): Promise<UserVM> {
    try {
      const old = await RepositoryService.user.findByObjectId(id).lean();

      const roleId = new ObjectId(payload.roleId);
      const roleExist = await RepositoryService.role.findByObjectId(roleId).lean();
      if (!roleExist) throw new BadRequestException('Role doesnt exist');

      if (old.email !== payload.email) {
        const emailExist = await RepositoryService.user.findOne({ email: payload.email }).lean();
        if (emailExist) throw new BadRequestException('Email already exist');
      }

      const user = new User();
      const generatePassword = user.setPassword(payload.password);

      const data: Partial<User> = {
        username: payload.username,
        email: payload.email,
        name: payload.name,
        phoneNumber: payload.phoneNumber,
        _password: generatePassword.password,
        _passwordSalt: generatePassword.passwordSalt,
        roleId: roleId,
      };

      const response = await RepositoryService.user.updateAndReturnUpdatedDocument(id, data).lean();
      return response;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  static async findById(id: string): Promise<UserVM> {
    try {
      const response = await RepositoryService.user.findByObjectId(id).lean();
      return response;
    } catch (e) {
      throw new BadRequestException('Cannot find id');
    }
  }

  static async delete(id: string) {
    try {
      const userId = new ObjectId(id);
      const user = await RepositoryService.user.findByObjectId(userId);

      await RepositoryService.user.remove(userId)
      
      return true;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  public async verifyEmail(email: string) {
    const user = await RepositoryService.user.findOne({
      email,
      isActive: true,
    });

    if (user) {
      const tokenEmail = this.generateTokenEmail(user.id);
      const sendEmailResult = this.sendEmailconfirmation(user, tokenEmail);

      return sendEmailResult;
    } else {
      return {
        statusCode: 400,
        message: 'Alamat email tidak ditemukan',
        success: false
      }
    }
  }

  private generateTokenEmail(key: string) {
    // 1 day expiration
    const ttl = moment().add(1, 'd').valueOf();
    const secretKey = {
      ttl,
      key
    }

    return Buffer.from(JSON.stringify(secretKey)).toString('base64')
  }

  private async sendEmailconfirmation(user: any, key: string) {
    await this.mailService.sendForgotPasswordEmail(
      user,
      ConfigService.get('sendgrid.redirectUrl') + '/reset-password?id=' + key
    )

    return {
      success: true,
      message: 'Permintaan reset password telah dikirim. Mohon cek email anda.',
      statusCode: 200,
    };
  }

  public static async resetPasswordUser(token: string, password: string) {
    let decodedToken;

    // check token
    try {
      decodedToken = JSON.parse(Buffer.from(token, 'base64').toString());
    } catch (e) {
      return {
        success: false,
        message: 'Token tidak valid, mohon segera mengulang permintaan reset password',
        statusCode: 400,
      };
    }

    // check expiration
    if (moment().valueOf() < decodedToken.ttl) {
      // check user exist
      const userExist = await RepositoryService.user.findByObjectId(decodedToken.key);
      if (userExist) {
        const _user = new User();
        const newPassword = _user.setPassword(password);

        userExist._password = newPassword.password;
        userExist._passwordSalt = newPassword.passwordSalt;

        const updateResult = await RepositoryService.user.update(userExist._id, userExist).exec();
        if (updateResult) {
          return {
            success: true,
            statusCode: 200,
            message: 'Password akun berhasil diubah! Silahkan login kembali'
          }
        } else {
          return {
            statusCode: 400,
            message: updateResult,
            success: false
          }
        }

      } else {
        throw new BadRequestException('Akun tidak ditemukan!');
      }
    } else {
      return {
        statusCode: 400,
        message: 'Sesi reset password habis, mohon untuk mengirim ulang permintaan reset password',
        success: false
      }
    }
  }
}
