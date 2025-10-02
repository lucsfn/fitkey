import { verifyJWT } from "@/http/middlewares/verify-jwt.ts";
import type { FastifyInstance } from "fastify";
import { search } from "./search.ts";
import { nearby } from "./nearby.ts";
import { create } from "./create.ts";

export async function gymsRoutes(app: FastifyInstance) {
    // All routes below this hook will call the jwt middleware
    app.addHook("onRequest", verifyJWT);

    app.get("/gyms/search", search);
    app.get("/gyms/nearby", nearby);

    app.post("/gyms", create);
}
