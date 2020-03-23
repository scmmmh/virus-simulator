<template>
    <div class="home">
        <v-btn  @click="startSimulation">Start</v-btn>
        {{ value }}
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// eslint-disable-next-line
// @ts-ignore
import populationWorkerLoader from 'workerize-loader!@/webworkers/population';
// eslint-disable-next-line
// @ts-ignore
import spreadWorkerLoader from 'workerize-loader!@/webworkers/spread';

import { PopulationWorker, SpreadWorker, Person } from '@/interfaces';

@Component({
    components: {
    },
})
export default class Home extends Vue {
    public value = -1;
    public populationWorker: PopulationWorker | null = null;
    public spreadWorker: SpreadWorker | null = null;
    public population: Person[] | null = null;

    public async startSimulation() {
        this.generatePopulation();
    }

    private async generatePopulation() {
        this.populationWorker = populationWorkerLoader();
        if (this.populationWorker) {
            this.population = await this.populationWorker.generatePopulation(10000);
            this.populationWorker.terminate();
            this.populationWorker = null;
            await this.runSimulation();
        }
    }

    private async runSimulation() {
        this.spreadWorker = spreadWorkerLoader();
        if (this.spreadWorker && this.population) {
            const infected = await this.spreadWorker.runSimulation(this.population);
            console.log(infected);
            this.value = infected.length;
            this.spreadWorker.terminate();
            this.spreadWorker = null;
        }
    }
}
</script>
