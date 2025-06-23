export const AUTH_USER_EXISTS = 'User with this email exists';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong';

export const AuthenticationProperty = {
  Email: {
    Description: {
      Description: 'User email',
      Example: 'user@example.ru',
    },
    Validate: { Message: 'The email is not valid' },
  },
  Login: {
    Description: {
      Description: 'User login',
      Example: 'Archibald',
    },
    Validate: {
      Message: 'Login is required',
      MinLength: 3,
      MaxLength: 50,
    },
  },
  Avatar: {
    Description: {
      Description: 'User avatar (jpg/png, max 500KB)',
      Example: '/images/avatar/avatar.jpg',
    },
    Validate: {
      FileExtRegExp: /\.(jpg|jpeg|png)$/,
      MaxSize: 500 * 1024,
      Message: 'It is allowed to upload a jpg or png image (size <= 500 Kb)',
    },
  },
  Password: {
    Description: {
      Description: 'User password (min 6 characters max 12, at least one letter and one number)',
      Example: 'qwerty123',
    },
    Validate: {
      MinLength: {
        Value: 6,
        Message: 'Password must be at least 6 characters long',
      },
      MaxLength: {
        Value: 12,
        Message: 'Password must be at most 12 characters long',
      },
      RegExp: {
        Value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,12}$/,
        Message: 'Password must contain at least one letter and one number',
      },
    },
  },
  UserId: {
    Description: {
      Description: 'User ID',
      Example: '549ac4b0-4489-31eb-96d9-8bdf7b8f9326',
    },
  },
  OldPassword: {
    Description: {
      Description: 'Current user password',
      Example: 'qwerty123',
    },
  },
  AccessToken: {
    Description: {
      Description: 'User access token',
      Example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5ydSIsImZpcnN0TmFtZSI6IkFyY2hpYmFsZCIsImxhc3RuYW1lIjoiU2xvbm92c2t5IiwidXNlcklkIjoiNTQ5YWM0YjAtNDQ4OS0zMWViLTk2ZDktOGJkZjdiOGY5MzI2In0.J-Qk6fUpKYuxPzkbGa5ruT9pWdZ0d-tZGsEitl893Ts',
    },
  },
  RefreshToken: {
    Description: {
      Description: 'User refresh token',
      Example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5ydSIsImZpcnN0TmFtZSI6IkFyY2hpYmFsZCIsImxhc3RuYW1lIjoiU2xvbm92c2t5IiwidXNlcklkIjoiNTQ5YWM0YjAtNDQ4OS0zMWViLTk2ZDktOGJkZjdiOGY5MzI2In0.J-Qk6fUpKYuxPzkbGa5ruT9pWdZ0d-tZGsEitl893Ts',
    },
  },
  CreatedAt: {
    Description: {
      Description: 'User register date (ISO format)',
      Example: '2025-05-01T11:54:13.605Z',
    },
  },
  PublicationsCount: {
    Description: {
      Description: 'Count of user publications',
      Example: '23',
    },
  },
  SubscribersCount: {
    Description: {
      Description: 'Count of user subscribers',
      Example: '543',
    },
  },
} as const;
