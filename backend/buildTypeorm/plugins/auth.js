import { readFileSync } from "node:fs";
import fp from "fastify-plugin";
export const AuthPlugin = fp(async function (fastify, opts) {
    fastify.register(import("@fastify/jwt"), {
        secret: {
            private: readFileSync("./src/certs/private.pem", { encoding: 'utf-8' }),
            public: readFileSync("./src/certs/public.pem", { encoding: 'utf-8' })
        },
        sign: { algorithm: 'RS256' }
    });
    fastify.addHook("onRequest", async (request, reply) => {
        try {
            await request.jwtVerify();
        }
        catch (err) {
            reply.send(err);
        }
    });
    fastify.decorate("auth", async function (request, reply) {
        console.log('request------', request.jwtVerify());
        try {
            // This is the thing we added in our interface above
            await request.jwtVerify();
        }
        catch (err) {
            reply.send(err);
        }
    });
});
//# sourceMappingURL=auth.js.map