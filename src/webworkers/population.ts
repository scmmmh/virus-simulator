import { Person, PopulationSettings } from '@/interfaces';

export function generatePopulation(settings: PopulationSettings) {
    const population = [] as Person[];
    for (let idx = 0; idx < settings.size; idx++) {
        population.push({
            age: Math.round(Math.random() * 90),
            infected: null,
            relationships: [],
        });
    }
    population.forEach((person, idx) => {
        while (person.relationships.length < 10) {
            const targetIdx = Math.floor(Math.random() * settings.size);
            let found = idx === targetIdx ;
            person.relationships.forEach((target) => {
                if (target.idx === targetIdx) {
                    found = true;
                }
            });
            if (!found) {
                person.relationships.push({
                    idx: targetIdx,
                });
                population[idx].relationships.push({
                    idx: idx,
                });
            }
        }
    });
    for (let idx2 = 0; idx2 < settings.initialInfected; idx2++) {
        population[Math.floor(Math.random() * population.length)].infected = 0;
    }
    return population;
}
