export const SUBSCRIPTION_ALREADY_EXISTS = 'Subscription already exists';
export const SUBSCRIPTION_NOT_FOUND = 'Subscription not found';

export const SubscriptionProperty = {
  Follower: {
    Description: {
      Description: 'ID пользователя, который подписывается или проверяет подписку',
      Example: '11111111-1111-1111-1111-111111111111',
    },
    Validate: { Message: 'Invalid UUID format for followerUserId' },
  },
  Followed: {
    Description: {
      Description: 'ID пользователя, на которого подписываются или проверяют подписку',
      Example: '22222222-2222-2222-2222-222222222222',
    },
    Validate: { Message: 'Invalid UUID format for followedUserId' },
  },
  ActionSuccess: {
    Description: {
      Description: 'Флаг успешного выполнения действия',
      Example: true,
    },
  },
  FollowerProfile: {
    userId: {
      Description: 'ID пользователя',
      Example: '6d308040-96a2-4162-bea6-2338e9976540',
    },
    login: {
      Description: 'Имя пользователя',
      Example: 'Первый Пользователь',
    },
    publicationsCount: {
      Description: 'Количество публикаций пользователя',
      Example: 10,
    },
    subscribersCount: {
      Description: 'Количество подписчиков пользователя',
      Example: 5,
    },
    isSubscribed: {
      Description: 'Признак, подписан ли текущий пользователь на этого пользователя',
      Example: true,
    },
  },
  IsSubscribed: {
    Description: {
      Description: 'Признак активной подписки',
      Example: true,
    },
  },
  Followers: {
    Description: {
      Description: 'Список ID пользователей (подписчиков)',
      Example: [
        '549ac4b0-4489-31eb-96d9-8bdf7b8f9326',
        '549ac4b0-2222-3333-96d9-8bdf7b8f9326',
        '11122233-2222-3333-96d9-8bdf7b8f9326',
      ],
    },
  },
  Followings: {
    Description: {
      Description: 'Список ID пользователей, на которых подписан',
      Example: [
        '549ac4b0-4489-31eb-96d9-8bdf7b8f9326',
        '549ac4b0-2222-3333-96d9-8bdf7b8f9326',
        '11122233-2222-3333-96d9-8bdf7b8f9326',
      ],
    },
  },
};
