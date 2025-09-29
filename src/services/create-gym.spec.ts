import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository.ts";
import { CreateGymUseCase } from "./create-gym.ts";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new CreateGymUseCase(gymsRepository);
    });

    it("should be able to register", async () => {
        const { gym } = await sut.execute({
            title: "Fitkey Gym",
            description: null,
            phone: null,
            latitude: -19.8584157,
            longitude: -43.9816004,
        });

        expect(gym.id).toEqual(expect.any(String));
    });
});
