import { TokenPayload, User } from '@project/core';

export function createJWTPayload(user: User): TokenPayload {
  return {
    sub: user.id,
    email: user.email,
    login: user.login,
  };
}
