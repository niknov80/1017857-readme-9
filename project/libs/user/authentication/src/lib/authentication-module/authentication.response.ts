import { HttpStatus } from '@nestjs/common';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { UserRdo } from '../rdo/user.rdo';

export const AuthenticationResponse = {
  UserCreated: {
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created',
  },
  UserExist: {
    status: HttpStatus.CONFLICT,
    description: 'User with the email already exists',
  },
  BadRequest: {
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  },
  LoggedSuccess: {
    type: LoggedUserRdo,
    status: HttpStatus.CREATED,
    description: 'User has been successfully logged',
  },
  LoggedError: {
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong',
  },
  UserNotFound: {
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  },
  UserFound: {
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found',
  },
} as const;
