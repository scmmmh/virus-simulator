import gaussian from 'gaussian';

import { Person, PopulationSettings, VirusSettings } from '@/interfaces';

export function generatePopulation(populationSettings: PopulationSettings, virusSettings: VirusSettings) {
    const population = [] as Person[];
    for (let idx = 0; idx < populationSettings.size; idx++) {
        population.push({
            age: Math.round(Math.random() * 90),
            infected: null,
            incubation: null,
            infectuous: null,
            relationships: [],
        });
    }
    population.forEach((person, idx) => {
        while (person.relationships.length < 10) {
            const targetIdx = Math.floor(Math.random() * populationSettings.size);
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
    const incubationDist = gaussian(virusSettings.incubation.mean, Math.pow(virusSettings.incubation.std, 2));
    const infectuousDist = gaussian(virusSettings.infectuous.mean, Math.pow(virusSettings.infectuous.std, 2));
    for (let idx2 = 0; idx2 < populationSettings.initialInfected; idx2++) {
        const personIdx = Math.floor(Math.random() * population.length);
        const incubation = Math.round(incubationDist.ppf(Math.random()));
        const infectuous = incubation + Math.round(infectuousDist.ppf(Math.random()));
        population[personIdx].infected = 0;
        population[personIdx].incubation = incubation;
        population[personIdx].infectuous = infectuous;
    }
    return population;
}
