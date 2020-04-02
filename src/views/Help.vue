<template>
    <div class="help">
        <v-container>
            <overview-text/>
            <v-row>
                <v-col cols="4">
                    <v-card>
                        <v-card-title>Release History</v-card-title>
                        <v-list max-height="20rem" style="overflow-y: auto;">
                            <v-subheader>02.04.2020</v-subheader>
                            <v-list-item>
                                <v-list-item-avatar>
                                    <v-icon size="medium">mdi-alert-decagram</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>Initial release of the basic simulator</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import OverviewText from '@/components/OverviewText.vue';

@Component({
    components: {
        OverviewText,
    },
})
export default class Help extends Vue {
}
</script>
