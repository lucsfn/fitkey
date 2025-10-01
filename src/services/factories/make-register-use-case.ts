import { RegisterUseCase } from "../register.ts";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.ts";

export function makeRegisterUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const useCase = new RegisterUseCase(usersRepository);

    return useCase;
}
