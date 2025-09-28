import { RegisterUseCase } from "../register.ts";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.ts";

export function makeRegisterUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);

    return registerUseCase;
}
