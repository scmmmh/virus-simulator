<template>
    <v-card>
        <v-card-title>Population Overview</v-card-title>
        <v-data-table :headers="headers" :items="items" hide-default-footer/>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

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
            text: '#',
            value: 'count',
        }
    ];
    public get items() {
        const data = [
            {
                limit: 10,
                ageBand: '< 10',
                count: 0,
            },
            {
                limit: 18,
                ageBand: '10 - 17',
                count: 0,
            },
            {
                limit: 26,
                ageBand: '18 - 25',
                count: 0,
            },
            {
                limit: 36,
                ageBand: '26 - 35',
                count: 0,
            },
            {
                limit: 46,
                ageBand: '36 - 45',
                count: 0,
            },
            {
                limit: 56,
                ageBand: '46 - 55',
                count: 0,
            },
            {
                limit: 66,
                ageBand: '56 - 65',
                count: 0,
            },
            {
                limit: 76,
                ageBand: '66 - 75',
                count: 0,
            },
            {
                limit: 86,
                ageBand: '76 - 85',
                count: 0,
            },
            {
                limit: 200,
                ageBand: '> 85',
                count: 0,
            },
        ];
        this.$store.state.population.forEach((person: Person) => {
            for (let idx = 0; idx < data.length; idx++) {
                if (person.age < data[idx].limit) {
                    data[idx].count++;
                    break;
                }
            }
        });
        return data;
    }
}
</script>
