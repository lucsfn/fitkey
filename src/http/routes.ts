import type { FastifyInstance } from "fastify";
import { register } from "./controllers/register.ts";
import { authenticate } from "./controllers/authenticate.ts";
import { profile } from "./controllers/profile.ts";
import { verifyJWT } from "./middlewares/verify-jwt.ts";

export async function appRoutes(app: FastifyInstance) {
    app.post("/users", register);

    app.post("/sessions", authenticate);

    // Authenticated routes
    app.get("/me", { onRequest: [verifyJWT] }, profile);
}
