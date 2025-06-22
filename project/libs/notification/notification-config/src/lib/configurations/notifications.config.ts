import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 3003;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;
const DEFAULT_RABBIT_PORT = 5672;
const DEFAULT_SMTP_PORT = 25;

type Environment = (typeof ENVIRONMENTS)[number];

export interface NotificationConfig {
  environment: string;
  port: number;
  rabbit: {
    host: string;
    password: string;
    user: string;
    queue: string;
    exchange: string;
    port: number;
  };
  mail: {
    host: string;
    port: number;
    user?: string | null;
    password?: string | null;
    from: string;
  };
}

const validationSchema = Joi.object({
  environment: Joi.string()
    .valid(...ENVIRONMENTS)
    .required(),
  port: Joi.number().port().default(DEFAULT_PORT),
  rabbit: Joi.object({
    host: Joi.string().valid().hostname().required(),
    password: Joi.string().required(),
    port: Joi.number().port().default(DEFAULT_RABBIT_PORT),
    user: Joi.string().required(),
    queue: Joi.string().required(),
    exchange: Joi.string().required(),
  }),
  mail: Joi.object({
    host: Joi.string().valid().hostname().required(),
    port: Joi.number().port().default(DEFAULT_SMTP_PORT),
    user: Joi.string().optional().allow('', null),
    password: Joi.string().optional().allow('', null),
    from: Joi.string().required(),
  }),
});

function validateConfig(config: NotificationConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Notification Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): NotificationConfig {
  const environment = process.env.NODE_ENV as Environment;
  const port = parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10);
  const rabbitHost = process.env.RABBIT_HOST;
  const rabbitPassword = process.env.RABBIT_PASSWORD;
  const rabbitUser = process.env.RABBIT_USER;
  const rabbitQueue = process.env.RABBIT_QUEUE;
  const rabbitExchange = process.env.RABBIT_EXCHANGE;

  const mailHost = process.env.MAIL_SMTP_HOST;
  const mailPort = parseInt(process.env.MAIL_SMTP_PORT ?? DEFAULT_SMTP_PORT.toString(), 10);
  const mailUser = process.env.MAIL_USER_NAME;
  const mailPassword = process.env.MAIL_USER_PASSWORD;
  const mailFrom = process.env.MAIL_FROM;

  if (!rabbitHost || !rabbitPassword || !rabbitUser || !rabbitQueue || !rabbitExchange || !mailHost || !mailFrom) {
    throw new Error('Missing required environment variables for notification configuration');
  }

  const config: NotificationConfig = {
    environment,
    port,
    rabbit: {
      host: rabbitHost,
      password: rabbitPassword,
      user: rabbitUser,
      queue: rabbitQueue,
      exchange: rabbitExchange,
      port: parseInt(process.env.RABBIT_PORT ?? DEFAULT_RABBIT_PORT.toString(), 10),
    },
    mail: {
      host: mailHost,
      port: mailPort,
      user: mailUser,
      password: mailPassword,
      from: mailFrom,
    },
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
