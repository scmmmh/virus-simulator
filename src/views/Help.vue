<template>
    <div class="help">
        <v-container>
            <overview-text/>
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
