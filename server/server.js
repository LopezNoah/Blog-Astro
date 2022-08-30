const fastify = require("fastify")({ logger: true });
const path = require("path");

const start = async () => {
  try {
    await fastify.register(require("@fastify/express"));
    const pkg = await import("../dist/server/entry.mjs");
    await fastify.register(require("@fastify/static"), {
      root: path.join(__dirname, "..", "dist", "client"),
    });
    fastify.use(pkg.handler);
    await fastify.listen({ port: 5000 });
  } catch (err) {
    fastify.log.error(err);
  }
};
start();
