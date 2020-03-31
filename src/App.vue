<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <v-btn to="/" text>
                    <v-icon>mdi-chart-bell-curve</v-icon>
                    <span class="ml-2">Virus Simulator</span>
                </v-btn>
                <v-btn to="/settings" text :disabled="this.$store.state.running">
                    <v-icon>mdi-cogs</v-icon>
                    <span class="ml-2">Settings</span>
                </v-btn>
            </div>
            <v-spacer></v-spacer>
            <v-btn href="https://github.com/scmmmh/viral-simulator" target="_blank" text>
                <span class="mr-2">Source Code</span>
                <v-icon>mdi-github</v-icon>
            </v-btn>
        </v-app-bar>
        <v-content>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {
    },
})
export default class App extends Vue {
}
</script>
