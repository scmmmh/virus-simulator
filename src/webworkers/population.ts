import { Person } from '@/interfaces';

export function generatePopulation(populationSize: number) {
    const people = [] as Person[];
    for (let idx = 0; idx < populationSize; idx++) {
        people.push({
            age: Math.round(Math.random() * 90),
            infected: null,
            relationships: [],
        });
    }
    people.forEach((person, idx) => {
        while (person.relationships.length < 10) {
            const targetIdx = Math.floor(Math.random() * populationSize);
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
                people[idx].relationships.push({
                    idx: idx,
                });
            }
        }
    });
    return people;
}
