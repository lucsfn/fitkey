import { verifyJWT } from "@/http/middlewares/verify-jwt.ts";
import type { FastifyInstance } from "fastify";


export async function gymsRoutes(app: FastifyInstance) {
    // All routes below this hook will call the jwt middleware
    app.addHook('onRequest', verifyJWT)

    

}
