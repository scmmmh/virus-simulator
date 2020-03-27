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
                    <virus-stats-component/>
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
import VirusStatsComponent from '@/components/VirusStats.vue';
import { PopulationWorker, SpreadWorker, Person, VirusStats } from '@/interfaces';

@Component({
    components: {
        PopulationStats,
        VirusStatsComponent,
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
        return 100 / 990 * this.$store.state.step;
    }

    public async runSimulation() {
        this.$store.commit('setRunning', {
            running: true,
            step: 0,
            stepLabel: 'Starting up',
        });
        this.$store.commit('clearPopulations');
        this.$store.commit('clearVirusStats');
        for (let idx1 = 0; idx1 < 10; idx1++) {
            this.$store.commit('setRunning', {
                running: true,
                step: idx1 * 11,
                stepLabel: 'Generating population #' + (idx1 + 1),
            });
            let population = await this.populationWorker.generatePopulation(10000);
            for (let idx2 = 0; idx2 < 3; idx2++) {
                population[Math.floor(Math.random() * population.length)].infected = 0;
            }
            this.$store.commit('addPopulation', population);
            for (let idx2 = 0; idx2 < 90; idx2++) {
                this.$store.commit('setRunning', {
                    running: true,
                    step: idx1 * 11 + idx2 + 1,
                    stepLabel: 'Running simulation #' + (idx1 + 1) + ', day ' + (idx2 + 1),
                });
                population = await this.spreadWorker.step(population, idx2);
                const stats = {
                    infected: 0,
                    newInfected: 0,
                } as VirusStats;
                population.forEach((person: Person) => {
                    if (person.infected !== null) {
                        stats.infected++;
                        if (person.infected === idx2) {
                            stats.newInfected++;
                        }
                    }
                });
                this.$store.commit('addVirusStats', {
                    day: idx2,
                    stats: stats,
                });
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
