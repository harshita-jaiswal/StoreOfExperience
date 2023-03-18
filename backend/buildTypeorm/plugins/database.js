/** @module DatabasePlugin */
import "reflect-metadata";
import fp from "fastify-plugin";
import { User } from "../db/models/user.js";
import { AppDataSource } from "../db/datasources/dev_datasource.js";
import { Experience } from "../db/models/experience.js";
/**
 * Connects and decorates fastify with our Database connection
 * @function
 */
const DbPlugin = fp(async (app, options, done) => {
    const dataSourceConnection = AppDataSource;
    await dataSourceConnection.initialize();
    // this object will be accessible from any fastify server instance
    // app.status(200).send()
    // app.db.user
    app.decorate("db", {
        connection: dataSourceConnection,
        user: dataSourceConnection.getRepository(User),
        experience: dataSourceConnection.getRepository(Experience),
    });
    done();
}, {
    name: "database-plugin"
});
export default DbPlugin;
//# sourceMappingURL=database.js.map