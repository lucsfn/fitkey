import type { Prisma, User } from "@prisma/client";
import type { UsersRepository } from "../prisma/users-repository.ts";

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = [];

    async findById(id: string) {
        const user = this.items.find((item) => item.id === id);

        if (!user) {
            return null;
        }

        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find((item) => item.email === email);

        if (!user) {
            return null;
        }

        return user;
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: "12345678",
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date(),
        };

        this.items.push(user);

        return user;
    }
}
