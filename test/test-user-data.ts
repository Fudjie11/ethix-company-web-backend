import { User } from '../src/models/user/user';
import { UserCreate } from '../src/models/user/user.create';
import { UserUpdate } from '../src/models/user/user.update';
import { UserLoginRequest } from '../src/models/user/user-login-request';
import { UserLoginResponse } from '../src/models/user/user-login-response';
import { Gender } from '../src/shared/enum/gender';

export const createUserDto1: UserCreate = {
    email: 'testemail@gmail.com',
    password: 'password123',
    firstName: 'Mamen',
    lastName: 'OsGood',
    gender: Gender.MALE,
};

export const createUserDto2 = {
    email: 'testemail@gmail.com',
    password: 'password123',
    lastName: 'OsGood',
    gender: Gender.MALE,
};

export const createUserDto3 = {
    ...createUserDto1,
    email: 'not-email',
};

// export const createUserDto4 = {
//     ...createUserDto1,
//     birthday: 'not-valid-date',
// };

export const createUserDto5 = {
    ...createUserDto1,
    gender: 'not-valid-gender',
};

export const userLoginRequestDto1: UserLoginRequest = {
    email: createUserDto1.email,
    password: createUserDto1.password,
};

export const userLoginRequestDto2: UserLoginRequest = {
    email: 'wrong-email',
    password: createUserDto1.password,
};

export const userLoginRequestDto3: UserLoginRequest = {
    email: 'wrong-email',
    password: createUserDto1.password,
};

export const userDto1: User = {
    id: 'uuid/v4',
    phoneNumber: null,
    userName: null,
    email: 'testemail@gmail.com',
    firstName: 'Mamen',
    lastName: 'OsGood',
    gender: Gender.MALE,
};

export const userLoginResponseDto1: UserLoginResponse = {
    ...userDto1,
    token: 'token',
};

export const updateUserDto1: UserUpdate = {
    gender: Gender.FEMALE
};

export const userDto2: User = {
    ...userDto1,
    gender: Gender.FEMALE
};
