/** @module DatabasePlugin */
import "reflect-metadata";
import fp from "fastify-plugin";
import { User } from "../db/models/user.js";
import { IPHistory } from "../db/models/ip_history.js";
import { Match } from "../db/models/match.js";
import { AppDataSource } from "../db/datasources/dev_datasource.js";
import { Profile } from "../db/models/profile.js";
import { Message } from "../db/models/message.js";
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
        ip: dataSourceConnection.getRepository(IPHistory),
        match: dataSourceConnection.getRepository(Match),
        message: dataSourceConnection.getRepository(Message),
        profile: dataSourceConnection.getRepository(Profile),
    });
    done();
}, {
    name: "database-plugin"
});
export default DbPlugin;
//# sourceMappingURL=database.js.map