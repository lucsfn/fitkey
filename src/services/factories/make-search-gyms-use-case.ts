import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository.ts";
import { SearchGymUseCase } from "../search-gym.ts";

export function makeSearchGymsUseCase() {
    const gymsRepository = new PrismaGymsRepository();
    const useCase = new SearchGymUseCase(gymsRepository);

    return useCase;
}
