const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config({ path: '.env.development' });

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().default('development'),
  PORT: Joi.number().default(4040),
  /* DB: Joi.string().required().description('Database needs to be specified'),
  DB_HOST: Joi.string().required().description('DB host url'),
  DB_USER: Joi.string().default('root'),
  DB_PASSWORD: Joi.string(),
  DB_PORT: Joi.number().default(3306),
  DB_CONNECTION_LIMIT: Joi.number().default(10),
  JWT_SECRET: Joi.string()
    .required()
    .description('JWT Secret required to sign'),
  ENCYRPT_SALT_ROUNDS: Joi.number().default(10),
  REDIS_PORT: Joi.number().required(), */
})
  .unknown()
  .required();

// Validate the values of env variables
const { error } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
