export interface PopulationWorker {
    generatePopulation: (populationSettings: PopulationSettings, virusSettings: VirusSettings) => Person[];
    terminate: () => undefined;
}

export interface Person {
    age: number;
    infected: number | null;
    incubation: number | null;
    infectuous: number | null;
    relationships: Relationship[];
}

export interface Relationship {
    idx: number;
}

export interface SpreadWorker {
    step: (population: Person[], step: number, virusSettings: VirusSettings) => Person[];
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
    infectuous: number;
}

export interface Settings {
    population: PopulationSettings;
    simulation: SimulationSettings;
    virus: VirusSettings;
}

export interface VirusSettings {
    incubation: DistributionSettings;
    infectuous: DistributionSettings;
}

export interface DistributionSettings {
    mean: number;
    std: number;
}

export interface PopulationSettings {
    size: number;
    initialInfected: number;
}

export interface SimulationSettings {
    length: number;
    iterations: number;
}
