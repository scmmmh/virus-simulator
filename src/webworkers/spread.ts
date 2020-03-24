import { Person } from '@/interfaces';

export function step(population: Person[], step: number) {
    population.forEach((person) => {
        if (person.infected !== null && person.infected < step) {
            person.relationships.forEach((relationship) => {
                if (population[relationship.idx].infected === null) {
                    if (Math.random() < 0.1) {
                        population[relationship.idx].infected = step;
                    }
                }
            });
        }
    });
    return population;
}
