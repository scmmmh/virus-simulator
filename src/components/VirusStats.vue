<template>
    <v-card>
        <v-card-title>Virus Spread</v-card-title>
        <v-data-table :headers="headers" :items="items" :items-per-page="10"/>
        <v-card-text>This table show you the details on the virus' spread throughout the {{ simulationSettings.length }}
            days of the simulation.</v-card-text>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mean, std } from 'mathjs';

import { VirusDayStats, VirusStats } from '@/interfaces';

@Component({
    components: {
    },
})
export default class Home extends Vue {
    public headers = [
        {
            text: 'Day',
            value: 'day',
            sortable: false,
        },
        {
            text: 'New Infections',
            value: 'newInfected',
        },
        {
            text: 'Total Infected',
            value: 'infected',
        },
        {
            text: 'Total Infectuous',
            value: 'infectuous',
        }
    ];

    public get simulationSettings() {
        return this.$store.state.settings.simulation;
    }

    public get items() {
        return this.$store.state.virusStats.map((virusDay: VirusDayStats) => {
            return {
                day: virusDay.day,
                newInfected: virusDay.stats.length > 0 ? Math.round(mean(virusDay.stats.map((stat: VirusStats) => { return stat.newInfected; }))) + ' (± ' + Math.round(std(virusDay.stats.map((stat: VirusStats) => { return stat.newInfected; }))) + ')' : '-',
                infected: virusDay.stats.length > 0 ? Math.round(mean(virusDay.stats.map((stat: VirusStats) => { return stat.infected; }))) + ' (± ' + Math.round(std(virusDay.stats.map((stat: VirusStats) => { return stat.infected; }))) + ')' : '-',
                infectuous: virusDay.stats.length > 0 ? Math.round(mean(virusDay.stats.map((stat: VirusStats) => { return stat.infectuous; }))) + ' (± ' + Math.round(std(virusDay.stats.map((stat: VirusStats) => { return stat.infectuous; }))) + ')' : '-',
            }
        });
    }
}
</script>
