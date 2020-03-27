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
    step: (population: Person[], step: number) => Person[];
    terminate: () => undefined;
}

export interface SetRunningCommit {
    running: boolean;
    step: number;
    stepLabel: string;
}

export interface AddVirusStatsCommit {
    day: number;
    stats: VirusStats;
}

export interface VirusDayStats {
    day: number;
    stats: VirusStats[];
}

export interface VirusStats {
    infected: number;
    newInfected: number;
}
