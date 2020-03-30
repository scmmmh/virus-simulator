import gaussian from 'gaussian';

import { Person, VirusSettings } from '@/interfaces';

export function step(population: Person[], step: number, virusSettings: VirusSettings) {
    const incubationDist = gaussian(virusSettings.incubation.mean, Math.pow(virusSettings.incubation.std, 2));
    const infectuousDist = gaussian(virusSettings.infectuous.mean, Math.pow(virusSettings.infectuous.std, 2));
    population.forEach((person) => {
        if (person.incubation !== null && person.infectuous !== null && person.incubation < step && person.infectuous <= step) {
            person.relationships.forEach((relationship) => {
                if (population[relationship.idx].infected === null) {
                    if (Math.random() < 0.1) {
                        const incubation = step + Math.round(incubationDist.ppf(Math.random()));
                        const infectuous = incubation + Math.round(infectuousDist.ppf(Math.random()));
                        population[relationship.idx].infected = step;
                        population[relationship.idx].incubation = incubation;
                        population[relationship.idx].infectuous = infectuous;
                    }
                }
            });
        }
    });
    return population;
}
