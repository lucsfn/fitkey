import { verifyJWT } from "@/http/middlewares/verify-jwt.ts";
import type { FastifyInstance } from "fastify";
import { create } from "./create.ts";
import { history } from "./history.ts";
import { metrics } from "./metrics.ts";
import { validate } from "./validate.ts";
import { verifyUserRole } from "@/http/middlewares/verify-user-role.ts";

export async function checkInRoutes(app: FastifyInstance) {
    // All routes below this hook will call the jwt middleware
    app.addHook("onRequest", verifyJWT);

    app.get("/check-ins/history", history);
    app.get("/check-ins/metrics", metrics);

    app.post("/gyms/:gymId/check-ins", create);
    app.patch(
        "/check-ins/:checkInId/validate",
        { onRequest: [verifyUserRole("ADMIN")] },
        validate
    );
}
