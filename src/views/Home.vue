<template>
    <div class="home">
        <v-toolbar dense>
            <v-btn v-if="!isRunning" text @click="runSimulation">
                <span>Start</span>
                <v-icon>mdi-run</v-icon>
            </v-btn>
            <template v-else>
                <v-btn text :disabled="true">
                    <span>Simulation Running</span>
                    <v-icon>mdi-run-fast</v-icon>
                </v-btn>
                <v-spacer/>
                <span class="mr-2">{{ stepLabel }}</span>
                <v-progress-circular :value="progress" size="24" width="2"/>
            </template>
        </v-toolbar>
        <v-container fluid>
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-title>Virus Spread</v-card-title>
                        <virus-line stat="infected" title="Total Infected"/>
                    </v-card>
                </v-col>
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

import PopulationStats from '@/components/PopulationStats.vue';
import VirusStatsComponent from '@/components/VirusStats.vue';
import VirusLine from '@/components/VirusLine.vue';

@Component({
    components: {
        PopulationStats,
        VirusStatsComponent,
        VirusLine,
    },
})
export default class Home extends Vue {
    public get isRunning() {
        return this.$store.state.running;
    }

    public get stepLabel() {
        return this.$store.state.stepLabel;
    }

    public get progress() {
        return 100 / (this.$store.state.settings.simulation.length * this.$store.state.settings.simulation.iterations) * this.$store.state.step;
    }

    public async runSimulation() {
        this.$store.dispatch('startSimulation');
    }
}
</script>
