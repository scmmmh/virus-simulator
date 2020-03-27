import Vue from 'vue'
import Vuex from 'vuex'

import { Person, VirusDayStats, SetRunningCommit, AddVirusStatsCommit } from '@/interfaces';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      running: false,
      step: 0,
      stepLabel: '',
      populations: [] as Person[][],
      virusStats: [] as VirusDayStats[],
  },
  mutations: {
      clearPopulations(state) {
          state.populations = [];
      },

      addPopulation(state, payload: Person[]) {
          state.populations = state.populations.concat([payload]);
      },

      setRunning(state, payload: SetRunningCommit) {
          state.running = payload.running;
          state.step = payload.step;
          state.stepLabel = payload.stepLabel;
      },

      clearVirusStats(state) {
          const virusStats = [];
          for (let idx = 0; idx < 90; idx++) {
              virusStats.push({
                  day: idx,
                  stats: [],
              });
          }
          state.virusStats = virusStats;
      },

      addVirusStats(state, payload: AddVirusStatsCommit) {
          const virusStats = state.virusStats.slice();
          for (let idx = 0; idx < virusStats.length; idx++) {
              if (virusStats[idx].day === payload.day) {
                  virusStats[idx].stats.push(payload.stats);
                  break;
              }
          }
          state.virusStats = virusStats;
      },
  },
  actions: {
  },
  modules: {
  }
})
