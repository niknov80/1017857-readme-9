export const POST_NOT_FOUND = 'Post not found';
export const POST_FORBIDDEN = 'You are not the author of this publication.';

export const PostProperty = {
  Type: {
    Description: {
      Description: 'Publication type',
      Example: '',
    },
  },
  Status: {
    Description: {
      Description: 'Publication status',
      Example: '',
    },
  },
  PublicationDate: {
    Description: {
      Description: 'Publication date',
      Example: '',
    },
  },
  Tags: {
    Description: {
      Description: '',
      Example: '',
    },
    Validate: {
      MinLength: {
        Value: 3,
        Message: 'Password must be at least 6 characters long',
      },
      MaxLength: {
        Value: 10,
        Message: 'Password must be at most 12 characters long',
      },
      RegExp: {
        LetterStart: {
          Value: /^[a-zA-Zа-яА-ЯЁё].*/,
          Message: 'The tag must start with the letter',
        },
        NoSpace: {
          Value: /^\S+$/,
          Message: 'Tags cannot contain spaces.',
        },
      },
    },
  },
  Video: {
    Title: {
      Description: {
        Description: 'Video title',
        Example: '',
      },
      Validate: {
        MinLength: {
          Value: 20,
          Message: 'The minimum length is 20 characters',
        },
        MaxLength: {
          Value: 50,
          Message: 'The maximum length is 50 characters',
        },
      },
    },
    Url: {
      Description: {
        Description: 'Video link (URL)',
        Example: '',
      },
      Validate: {
        RegExp: {
          Value: /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//,
          Message: 'The link should lead to YouTube',
        },
      },
    },
  },
  Text: {
    Title: {
      Description: {
        Description: 'Text post title',
        Example: '',
      },
      Validate: {
        MinLength: {
          Value: 20,
          Message: 'The minimum length is 20 characters',
        },
        MaxLength: {
          Value: 50,
          Message: 'The maximum length is 50 characters',
        },
      },
    },
    Announcement: {
      Description: {
        Description: 'Text post announcement',
        Example: '',
      },
      Validate: {
        MinLength: {
          Value: 20,
          Message: 'The minimum length is 20 characters',
        },
        MaxLength: {
          Value: 255,
          Message: 'The maximum length is 255 characters',
        },
      },
    },
    Description: {
      Description: {
        Description: 'Text post description',
        Example: '',
      },
      Validate: {
        MinLength: {
          Value: 100,
          Message: 'The minimum length is 100 characters',
        },
        MaxLength: {
          Value: 1024,
          Message: 'The maximum length is 1024 characters',
        },
      },
    },
  },
  Quote: {
    Text: {
      Description: {
        Description: 'Quote post title',
        Example: '',
      },
      Validate: {
        MinLength: {
          Value: 20,
          Message: 'The minimum length is 20 characters',
        },
        MaxLength: {
          Value: 300,
          Message: 'The maximum length is 300 characters',
        },
      },
    },
    Author: {
      Description: {
        Description: 'Text post announcement',
        Example: '',
      },
      Validate: {
        MinLength: {
          Value: 3,
          Message: 'The minimum length is 3 characters',
        },
        MaxLength: {
          Value: 50,
          Message: 'The maximum length is 50 characters',
        },
      },
    },
  },
  Photo: {
    Id: {
      Description: {
        Description: 'Id photo post',
        Example: '',
      },
    },
  },
  Link: {
    Url: {
      Description: {
        Description: 'Link post URL',
        Example: '',
      },
    },
    Description: {
      Description: {
        Description: 'Link post description',
        Example: '',
      },
      Validate: {
        MaxLength: {
          Value: 300,
          Message: 'The maximum length is 300 characters',
        },
      },
    },
  },
};
