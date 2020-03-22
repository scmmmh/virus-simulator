<template>
    <div class="home">
        <v-btn  @click="runSimulation">Start</v-btn>
        {{ value }}
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// eslint-disable-next-line
// @ts-ignore
import populationWorkerLoader from 'workerize-loader!@/webworkers/population';

import { PopulationWorker, Person } from '@/interfaces';

@Component({
    components: {
    },
})
export default class Home extends Vue {
    public value = -1;
    public populationWorker: PopulationWorker | null = null;

    public async startSimulation() {
        this.generatePopulation();
    }

    private async generatePopulation() {
        this.populationWorker = populationWorkerLoader();
        if (this.populationWorker) {
            const population = await this.populationWorker.generatePopulation(10000);
            this.value = population.reduce((total: number, person: Person) => { return total + person.age; }, 0) / population.length;
            this.populationWorker.terminate();
            this.populationWorker = null;
            await this.runSimulation();
        }
    }

    private async runSimulation() {
        this.value = -1;
    }
}
</script>
