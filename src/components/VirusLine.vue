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
            const newInfectedData = newVirusStats.map((virusDay) => {
                return virusDay.stats.length > 0 ? Math.round(mean(virusDay.stats.map((stat: VirusStats) => { return stat.newInfected; }))) : 0;
            });
            const totalInfectedData = newVirusStats.map((virusDay) => {
                return virusDay.stats.length > 0 ? Math.round(mean(virusDay.stats.map((stat: VirusStats) => { return stat.infected; }))) : 0;
            });
            const minTotalInfectedData = newVirusStats.map((virusDay) => {
                return virusDay.stats.length > 0 ? Math.round(min(virusDay.stats.map((stat: VirusStats) => { return stat.infected; }))) : 0;
            });
            const maxTotalInfectedData = newVirusStats.map((virusDay) => {
                return virusDay.stats.length > 0 ? Math.round(max(virusDay.stats.map((stat: VirusStats) => { return stat.infected; }))) : 0;
            });
            const infectuousData = newVirusStats.map((virusDay) => {
                return virusDay.stats.length > 0 ? Math.round(mean(virusDay.stats.map((stat: VirusStats) => { return stat.infectuous; }))) : 0;
            });
            this.chartData = {
                labels: this.labels,
                datasets: [
                    {
                        label: 'Newly Infected',
                        borderColor: '#aaaa00',
                        backgroundColor: '#00000000',
                        data: newInfectedData,
                    },
                    {
                        label: 'Total Infected (Minimum)',
                        borderColor: '#ff000066',
                        backgroundColor: '#00000000',
                        data: minTotalInfectedData,
                    },
                    {
                        label: 'Total Infected (Average)',
                        borderColor: '#ff0000',
                        backgroundColor: '#00000000',
                        data: totalInfectedData,
                    },
                    {
                        label: 'Total Infected (Maximum)',
                        borderColor: '#ff000066',
                        backgroundColor: '#00000000',
                        data: maxTotalInfectedData,
                    },
                    {
                        label: 'Currently Infectuous',
                        borderColor: '#660000',
                        backgroundColor: '#00000000',
                        data: infectuousData,
                    },
                ]
            }
        }
    }
}
</script>
