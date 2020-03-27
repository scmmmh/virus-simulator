<template>
    <div class="home">
        <v-toolbar dense>
            <v-btn v-if="!isRunning" text @click="runSimulation">
                <span>Start</span>
                <v-icon>mdi-run</v-icon>
            </v-btn>
            <template v-else>
                <v-btn text>
                    <span>Simulation Running</span>
                    <v-icon>mdi-run-fast</v-icon>
                </v-btn>
                <v-spacer/>
                <span class="mr-2">{{ stepLabel }}</span>
                <v-progress-circular :value="progress" size="24" width="2"/>
            </template>
        </v-toolbar>
        <v-container>
            <v-row>
                <v-col>
                </v-col>
                <v-col>
                    <population-stats/>
                </v-col>
            </v-row>
        </v-container>
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
import PopulationStats from '@/components/PopulationStats.vue';
import { PopulationWorker, SpreadWorker, Person } from '@/interfaces';

@Component({
    components: {
        PopulationStats,
    },
})
export default class Home extends Vue {
    public value = -1;
    public populationWorker: PopulationWorker = populationWorkerLoader();
    public spreadWorker: SpreadWorker = spreadWorkerLoader();
    public population: Person[] | null = null;

    public get isRunning() {
        return this.$store.state.running;
    }

    public get stepLabel() {
        return this.$store.state.stepLabel;
    }

    public get progress() {
        return 100 / 55 * this.$store.state.step;
    }

    public async runSimulation() {
        this.$store.commit('setRunning', {
            running: true,
            step: 0,
            stepLabel: 'Starting up',
        });
        this.$store.commit('clearPopulations');
        for (let idx1 = 0; idx1 < 5; idx1++) {
            this.$store.commit('setRunning', {
                running: true,
                step: idx1 * 11,
                stepLabel: 'Generating a population',
            });
            const population = await this.populationWorker.generatePopulation(10000);
            this.$store.commit('addPopulation', population);
            for (let idx2 = 0; idx2 < 10; idx2++) {
                this.$store.commit('setRunning', {
                    running: true,
                    step: idx1 * 11 + idx2 + 1,
                    stepLabel: 'Simulation running',
                });
                await this.spreadWorker.step(population, idx2);
            }
        }
        this.$store.commit('setRunning', {
            running: false,
            step: 0,
            stepLabel: 'Completed',
        });
    }
}
</script>
