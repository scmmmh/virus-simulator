<template>
    <v-card>
        <v-card-title>Population Overview</v-card-title>
        <v-data-table :headers="headers" :items="items" hide-default-footer/>
        <v-card-text>This table shows you an overview over the {{ simulationSettings.iterations }} populations that were
            used as the basis for the virus simulation.</v-card-text>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mean, std } from 'mathjs';

import { Person } from '@/interfaces';

@Component({
    components: {
    },
})
export default class Home extends Vue {
    public headers = [
        {
            text: 'Age Band',
            value: 'ageBand',
            sortable: false,
        },
        {
            text: 'Number of people',
            value: 'count',
        },
        {
            text: '%',
            value: 'percentage',
        }
    ];

    public get simulationSettings() {
        return this.$store.state.settings.simulation;
    }

    public get items() {
        const data = [
            {
                limit: 10,
                ageBand: '< 10',
                count: '-',
                counts: [] as number[],
                percentage: '-',
                percentages: [] as number[],
            },
            {
                limit: 18,
                ageBand: '10 - 17',
                count: '-',
                counts: [] as number[],
                percentage: '-',
                percentages: [] as number[],
            },
            {
                limit: 26,
                ageBand: '18 - 25',
                count: '-',
                counts: [] as number[],
                percentage: '-',
                percentages: [] as number[],
            },
            {
                limit: 36,
                ageBand: '26 - 35',
                count: '-',
                counts: [] as number[],
                percentage: '-',
                percentages: [] as number[],
            },
            {
                limit: 46,
                ageBand: '36 - 45',
                count: '-',
                counts: [] as number[],
                percentage: '-',
                percentages: [] as number[],
            },
            {
                limit: 56,
                ageBand: '46 - 55',
                count: '-',
                counts: [] as number[],
                percentage: '-',
                percentages: [] as number[],
            },
            {
                limit: 66,
                ageBand: '56 - 65',
                count: '-',
                counts: [] as number[],
                percentage: '-',
                percentages: [] as number[],
            },
            {
                limit: 76,
                ageBand: '66 - 75',
                count: '-',
                counts: [] as number[],
                percentage: '-',
                percentages: [] as number[],
            },
            {
                limit: 86,
                ageBand: '76 - 85',
                count: '-',
                counts: [] as number[],
                percentage: '-',
                percentages: [] as number[],
            },
            {
                limit: 200,
                ageBand: '> 85',
                count: '-',
                counts: [] as number[],
                percentage: '-',
                percentages: [] as number[],
            },
        ];

        this.$store.state.populations.forEach((population: Person[]) => {
            for (let idx = 0; idx < data.length; idx++) {
                data[idx].counts.push(0);
            }
            population.forEach((person) => {
                for (let idx = 0; idx < data.length; idx++) {
                    if (person.age < data[idx].limit) {
                        data[idx].counts[data[idx].counts.length - 1]++;
                        break;
                    }
                }
            });
            for (let idx = 0; idx < data.length; idx++) {
                data[idx].percentages.push(100 / population.length * data[idx].counts[data[idx].counts.length - 1]);
            }
        });

        for (let idx = 0; idx < data.length; idx++) {
            if (data[idx].counts.length > 0) {
                data[idx].count = Math.round(mean(data[idx].counts)) + ' (± ' + Math.round(std(data[idx].counts)) + ')';
                data[idx].percentage = mean(data[idx].percentages).toFixed(2) + '% (± ' + std(data[idx].percentages).toFixed(2) + '%)';
            }
        }
        return data;
    }
}
</script>
