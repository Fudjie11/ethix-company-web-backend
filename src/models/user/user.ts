import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Gender } from '../../shared/enum/gender';
import { MBaseListResponse } from '../base/base-list-response';

export class User {
    @ApiProperty()
    id: Types.ObjectId;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly phoneNumber: string;

    @ApiProperty()
    readonly userName: string;

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly gender: Gender;
}

export class UserVM {
    @ApiProperty()
    _id: Types.ObjectId;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly phoneNumber: string;

    @ApiProperty()
    readonly username: string;

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly gender: Gender;
}

export class UserListPaginationVM extends MBaseListResponse<UserVM[]> {}