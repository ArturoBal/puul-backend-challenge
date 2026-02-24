import { DataSource } from 'typeorm';
import { envs } from './src/config/envs';

export default new DataSource({
    type: 'postgres',
    host: envs.dbHost,
    port: envs.dbPort,
    username: envs.dbUsername,
    password: envs.dbPassword,
    database: envs.dbName,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
});
