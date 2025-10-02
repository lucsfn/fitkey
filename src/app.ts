import fastify from "fastify";
import z, { ZodError } from "zod";
import { env } from "./env/index.ts";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { usersRoutes } from "./http/controllers/users/routes.ts";
import { gymsRoutes } from "./http/controllers/gyms/routes.ts";
import { checkInRoutes } from "./http/controllers/check-ins/routes.ts";

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: "refreshToken",
        signed: false,
    },
    sign: {
        expiresIn: "10m",
    },
});

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInRoutes);

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: "Validation error.",
            issues: z.treeifyError(error),
        });
    }

    if (env.NODE_ENV != "production") {
        console.error(error);
    } else {
        // TODO: Hewe we should log to an external tool
    }

    return reply.status(500).send({ message: "Internal server error." });
});
