<script lang="ts">
import { Line, mixins } from 'vue-chartjs';
import { mean, max, min } from 'mathjs';

export default {
    extends: Line,
    mixins: [
        mixins.reactiveData,
    ],
    data() {
        const labels = [];
        for (let idx = 0; idx < this.$store.state.settings.simulation.length; idx++) {
            labels.push(idx);
        }
        return {
            labels: labels,
            options: {
                tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
            }
        }
    },
    props: ['stat', 'title'],
    computed: {
        virusStats() {
            return this.$store.state.virusStats;
        },
    },
    mounted() {
        this.renderChart(this.chartData, this.options);
    },
    watch: {
        virusStats(newVirusStats) {
            const minimum = [] as number[];
            const average = [] as number[];
            const maximum = [] as number[];
            newVirusStats.map((virusDay) => {
                if (virusDay.stats.length > 0) {
                    const data = virusDay.stats.map((stat: VirusStats) => { return stat[this.$props.stat]; });
                    minimum.push(min(data));
                    average.push(mean(data));
                    maximum.push(max(data));
                } else {
                    minimum.push(0);
                    average.push(0);
                    maximum.push(0);
                }
            });
            this.chartData = {
                labels: this.labels,
                datasets: [
                    {
                        label: 'Minimum',
                        borderColor: '#ff000066',
                        backgroundColor: '#00000000',
                        data: minimum,
                    },
                    {
                        label: 'Average',
                        borderColor: '#ff0000',
                        backgroundColor: '#00000000',
                        data: average,
                    },
                    {
                        label: 'Maximum',
                        borderColor: '#ff000066',
                        backgroundColor: '#00000000',
                        data: maximum,
                    },
                ]
            }
        }
    }
}
</script>
