<template>
    <v-row>
        <v-col cols="8">
            <v-card>
                <v-card-title>Welcome</v-card-title>
                <v-card-text>
                    <p>The Virus Simulator is a very simple simulation of the spread of a virus through a
                        population. It uses what is known as an Individual Based Model (IBM). This means that
                        the simulator first generates a random population, then an initial set of individuals in
                        that population are "infected" with the virus. The simulation then proceeds on a
                        day-by-day basis. On each day, the simulation checks all infected individuals and if
                        the individual is currently "infectuous", then for each of the relationships the
                        individual has, there is a random chance that the related individual is infected. This process
                        is then repeated for the duration of the simulation. Because the simulator makes uses of random
                        choices at various points, the outcome will vary depending on these random choices. To reduce
                        the impact of these the simulation will be run a number of times and the results averaged.</p>
                    <p class="red--text">This simulator <strong>must not</strong> be used to support any
                        decisions. It is only meant to help you understand how a virus can spread and how different
                        interventions can affect the spread. It <strong>cannot</strong> make any predictions on how
                        an epidemic will play out in reality.</p>
                    <p>The default settings produce a nice simulation in a reasonable time. If you want to see
                        what happens in different scenarios, use the <router-link to="/settings">Settings</router-link>
                        to change things.</p>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="4">
            <v-card>
                <v-card-title class="red white--text">Limitations</v-card-title>
                <v-card-text class="mt-3">
                    <p>The Virus Simulator comes with a few <strong>significant</strong> limitations, which
                       mean that it <strong class="red--text">must not</strong> be used to support any kind
                       of decision you make:</p>
                    <ul>
                        <li>It has a <strong>very simple</strong> population model. This will be improved over
                            time, but currently the age distribution of the population does not reflect any
                            realistic spread. Similarly the connections between individuals along which the
                            virus spreads are purely random and do not reflect the kind of relationships a real
                            population has.</li>
                        <li>It has a <strong>very small</strong> population size. This is necessary in order to
                            be able to run the simulation in the browser. Full-size IBMs require massive
                            computing power to run, making them inaccessible to most users. By reducing the
                            population size it is possible to play with the simulation parameters and
                            interventions in the browser.</li>
                        <li>It has a <strong>very simple</strong> transmission model. This will be improved
                            over time, but currently transmission along any relationship is similarly likely
                            and aspects such as close-ness of relationship are not taken into account.</li>
                        <li>It relies on a single type of statistical model for any random aspects. IBMs use
                            random values to model that in real life sometimes things happen and somtimes not.
                            A large number of models for generating such random models exists and different
                            ones apply to different situations. For simplicity of the simulator it only uses
                            a single model, a <a href="https://en.wikipedia.org/wiki/Normal_distribution" target="_blank" rel="noopener">Gaussian normal distribution</a>.</li>
                    </ul>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {
    },
})
export default class Welcome extends Vue {
}
</script>
