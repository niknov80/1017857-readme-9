import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface postgresConfig {
  user: string;
  password: string;
  database: string;
  pgEmail: string;
  pgPassword: string;
}

const validationSchema = Joi.object({
  user: Joi.string().required(),
  password: Joi.string().required(),
  database: Joi.string().required(),
  pgEmail: Joi.string().required(),
  pgPassword: Joi.string().required(),
});

function validateConfig(config: postgresConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[DB Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): postgresConfig {
  const config: postgresConfig = {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    pgEmail: process.env.PG_EMAI,
    pgPassword: process.env.PG_PASSWORD,
  };

  validateConfig(config);
  return config;
}

export default registerAs('db', getConfig);
