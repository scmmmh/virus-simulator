import { Person } from '@/interfaces';

export function runSimulation(population: Person[]) {
    let infected = [] as number[];
    initialise(population);
    infected.push(stats(population));
    for (let idx = 0; idx < 50; idx++) {
        step(population, idx);
        infected.push(stats(population));
    }
    return infected;
}

function initialise(population: Person[]) {
    for (let count = 0; count < 3; count++) {
        const idx = Math.round(Math.random() * population.length);
        population[idx].infected = 0;
    }
}

function step(population: Person[], step: number) {
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
}

function stats(population: Person[]) {
    return population.reduce((acc, obj) => {
        if (obj.infected !== null) {
            return acc + 1;
        } else {
            return acc;
        }
    }, 0);
}
