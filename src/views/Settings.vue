<template>
    <v-container>
        <v-tabs v-model="tab">
            <v-tab :key="1">Virus Settings</v-tab>
            <v-tab :key="2">Simulation Settings</v-tab>
            <v-tab :key="3">Population Settings</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item :key="1">
                <v-card>
                    <form class="px-4">
                        <v-container>
                            <v-row cols="12">
                                <v-col cols="2">
                                    <v-text-field label="Average Incubation Period (Days)" type="number" v-model="virusIncubationMean"/>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field label="± Incubation Period (Days)" type="number" v-model="virusIncubationStd"/>
                                </v-col>
                            </v-row>
                            <v-row cols="12">
                                <v-col cols="2">
                                    <v-text-field label="Average Infectuous Period (Days)" type="number" v-model="virusInfectuousMean"/>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field label="± Infectuous Period (Days)" type="number" v-model="virusInfectuousStd"/>
                                </v-col>
                            </v-row>
                        </v-container>
                    </form>
                </v-card>
            </v-tab-item>
            <v-tab-item :key="2">
                <v-card>
                    <form class="px-4">
                        <v-container>
                            <v-row cols="12">
                                <v-col cols="2">
                                    <v-text-field label="Simulation Length (Days)" type="number" v-model="simulationLength"/>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field label="Number of Iterations" type="number" v-model="simulationIterations"/>
                                </v-col>
                            </v-row>
                        </v-container>
                    </form>
                </v-card>
            </v-tab-item>
            <v-tab-item :key="3">
                <v-card>
                    <form class="px-4">
                        <v-container>
                            <v-row cols="12">
                                <v-col cols="2">
                                    <v-text-field label="Population Size" type="number" v-model="populationSize"/>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field label="Initial Infections" type="number" v-model="initialInfected"/>
                                </v-col>
                            </v-row>
                        </v-container>
                    </form>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {
    },
})
export default class Home extends Vue {
    public tab = 0;

    get virusIncubationMean() {
        return this.$store.state.settings.virus.incubation.mean;
    }

    set virusIncubationMean(value: string) {
        this.$store.commit('setVirusIncubationMean', Number.parseInt(value));
    }

    get virusIncubationStd() {
        return this.$store.state.settings.virus.incubation.std;
    }

    set virusIncubationStd(value: string) {
        this.$store.commit('setVirusIncubationStd', Number.parseInt(value));
    }

    get virusInfectuousMean() {
        return this.$store.state.settings.virus.infectuous.mean;
    }

    set virusInfectuousMean(value: string) {
        this.$store.commit('setVirusInfectuousMean', Number.parseInt(value));
    }

    get virusInfectuousStd() {
        return this.$store.state.settings.virus.infectuous.std;
    }

    set virusInfectuousStd(value: string) {
        this.$store.commit('setVirusInfectuousStd', Number.parseInt(value));
    }

    get simulationLength() {
        return this.$store.state.settings.simulation.length;
    }

    set simulationLength(value: string) {
        this.$store.commit('setSimulationLength', Number.parseInt(value));
    }

    get simulationIterations() {
        return this.$store.state.settings.simulation.iterations;
    }

    set simulationIterations(value: string) {
        this.$store.commit('setSimulationIterations', Number.parseInt(value));
    }

    get populationSize() {
        return this.$store.state.settings.population.size;
    }

    set populationSize(value: string) {
        this.$store.commit('setPopulationSize', Number.parseInt(value));
    }

    get initialInfected() {
        return this.$store.state.settings.population.initialInfected;
    }

    set initialInfected(value: string) {
        this.$store.commit('setInitialInfected', Number.parseInt(value));
    }
}
</script>
