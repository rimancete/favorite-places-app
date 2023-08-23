/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const z = require('zod');
const path = require('path');

const APP_ENV = process.env.APP_ENV ?? 'development';
const envPath = path.resolve(__dirname, `.env.${APP_ENV}`);

require('dotenv').config({
  path: envPath,
});

// creating the schema
const client = z.object({
  APP_ENV: z.enum(['development', 'staging', 'production']),
  API_URL: z.string(),
  API_TOKEN: z.string(),
  COMPANY: z.string(),
});

// Get the environment from the process

/**
 * @type {Record<keyof z.infer<typeof client> , string | undefined>}
 */
const _clientEnv = {
  APP_ENV,

  // ADD YOUR ENV VARS HERE TOO
  API_URL: process.env.API_URL,
  API_TOKEN: process.env.API_TOKEN,
  COMPANY: process.env.COMPANY,
};

// we merge all variables into one object
const _env = {
  ..._clientEnv,
};

// const merged = client.merge(client);
const parsed = client.safeParse(_env);

if (parsed.success === false) {
  // eslint-disable-next-line no-console
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors,

    `\n❌ Missing variables in .env.${APP_ENV} file, Make sure all required variables are defined in the .env.${APP_ENV} file.`,
    `\n💡 Tip: If you recently updated the .env.${APP_ENV} file and the error still persists, try restarting the server with the -cc flag to clear the cache.`,
  );
  throw new Error('Invalid environment variables, Check terminal for more details ');
}

const Env = parsed.data;
const ClientEnv = client.parse(_clientEnv);

module.exports = {
  Env,
  ClientEnv,
};
