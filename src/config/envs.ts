
import 'dotenv/config';
import * as joi from 'joi'

interface EnvVars {
    API_PORT: number,
    DB_PORT: number,
    DB_NAME: string,
    DB_HOST: string,
    DB_USERNAME: string,
    DB_PASSWORD: string,
    DB_SYNCHRONIZE: boolean,
}

const envsSchema = joi.object({
    API_PORT: joi.number().required(),
    DB_PORT: joi.number().required(),
    DB_NAME: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_SYNCHRONIZE: joi.boolean().required(),
})
    .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error}`);
}

const envsVars: EnvVars = value

export const envs = {
    apiPort: envsVars.API_PORT,
    dbPort: envsVars.DB_PORT,
    dbName: envsVars.DB_NAME,
    dbHost: envsVars.DB_HOST,
    dbUsername: envsVars.DB_USERNAME,
    dbPassword: envsVars.DB_PASSWORD,
    dbSynchronize: envsVars.DB_SYNCHRONIZE,
}