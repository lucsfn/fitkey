import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository.ts";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymUseCase } from "./search-gym.ts";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymUseCase;

describe("Search Gyms Use Case", () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new SearchGymUseCase(gymsRepository);
    });

    it("should be able to search for gyms", async () => {
        await gymsRepository.create({
            title: "Fitkey Gym",
            description: null,
            phone: null,
            latitude: -19.8584157,
            longitude: -43.9816004,
        });

        await gymsRepository.create({
            title: "IntelligentFit Gym",
            description: null,
            phone: null,
            latitude: -19.8584157,
            longitude: -43.9816004,
        });

        const { gyms } = await sut.execute({
            query: "Fitkey",
            page: 1,
        });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({ title: "Fitkey Gym" }),
        ]);
    });

    it("should be able to fetch paginated gyms search", async () => {
        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `Fitkey Gym ${i}`,
                description: null,
                phone: null,
                latitude: -19.8584157,
                longitude: -43.9816004,
            });
        }

        const { gyms } = await sut.execute({
            query: "Fitkey",
            page: 2
        });

        expect(gyms).toHaveLength(2);
        expect(gyms).toEqual([
            expect.objectContaining({ title: "Fitkey Gym 21" }),
            expect.objectContaining({ title: "Fitkey Gym 22" }),
        ]);
    });
});
