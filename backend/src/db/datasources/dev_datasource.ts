// We need dotenv here because our datasources are processed from CLI in addition to vite
import dotenv from "dotenv";
import TypeORM from 'typeorm';
// Similar reasoning as above, we need to add the file extensions to this file's imports for CLI usage
import { User } from "../models/user";
import { Experience } from "../models/experience";
import { initialize1679431901208 } from "../migrations/1679431901208-initialize";

dotenv.config();

// @ts-ignore 
const env = process.env;

export const AppDataSource = new TypeORM.DataSource({
    type: "postgres",
    host: env.VITE_DB_HOST,
    port: Number(env.VITE_DB_PORT),
    username: env.VITE_DB_USER,
    password: env.VITE_DB_PASS,
    database: env.VITE_DB_NAME,
    // entities are used to tell TypeORM which tables to create in the database
    entities: [
        User,
        Experience
    ],
    migrations: [
        initialize1679431901208
    ],
    // DANGER DANGER our convenience will nuke production data!
    synchronize: false
});
