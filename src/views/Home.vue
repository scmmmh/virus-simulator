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
        <v-container v-if="isInitial">
            <overview-text/>
        </v-container>
        <v-container fluid v-else>
            <v-row>
                <v-col cols="4">
                    <v-card>
                        <v-card-title>Virus Spread</v-card-title>
                        <virus-line stat="infected" title="Total Infected"/>
                        <v-card-text>This graph shows the average number of infected individuals on each of the
                            {{ $store.state.settings.simulation.length }} days of the simulation over the
                            {{ $store.state.settings.simulation.iterations }} iterations. It also shows you the
                            largest and smallest number of infected individuals to give you an idea of the kind of
                            spread the random choices create.</v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="4">
                    <virus-stats-component/>
                </v-col>
                <v-col cols="4">
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
import OverviewText from '@/components/OverviewText.vue';

@Component({
    components: {
        PopulationStats,
        VirusStatsComponent,
        VirusLine,
        OverviewText,
    },
})
export default class Home extends Vue {
    public get isInitial() {
        return this.$store.state.initial;
    }

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
