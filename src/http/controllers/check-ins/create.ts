import type { FastifyRequest, FastifyReply } from "fastify";

import z from "zod";

import { makeCheckInUseCase } from "@/services/factories/make-check-in-use-case.ts";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createCheckInParamsSchema = z.object({
        gymId: z.uuid(),
    });

    const createCheckInBodySchema = z.object({
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90;
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180;
        }),
    });

    const { latitude, longitude } = createCheckInBodySchema.parse(request.body);

    const { gymId } = createCheckInParamsSchema.parse(request.params);

    const checkInUseCase = makeCheckInUseCase();

    await checkInUseCase.execute({
        gymId,
        userId: request.user.sub,
        userLatitude: latitude,
        userLongitude: longitude,
    });

    return reply.status(201).send();
}
