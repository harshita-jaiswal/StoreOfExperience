import fp from "fastify-plugin";
export const AuthPlugin = fp(async function (fastify, opts) {
    fastify.register(import("@fastify/jwt"), {
        secret: "superSecret"
    });
    fastify.decorate("auth", async function (request, reply) {
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