export interface PopulationWorker {
    generatePopulation: (populationSize: number) => Person[];
    terminate: () => undefined;
}

export interface Person {
    age: number;
    infected: number | null;
    relationships: Relationship[];
}

export interface Relationship {
    idx: number;
}

export interface SpreadWorker {
    runSimulation: (population: Person[]) => number[];
    terminate: () => undefined;
}
