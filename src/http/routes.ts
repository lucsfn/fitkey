import type { FastifyInstance } from "fastify";
import { register } from "./controllers/register.ts";

export async function appRoutes(app: FastifyInstance) {
    app.post("/users", register);
}
