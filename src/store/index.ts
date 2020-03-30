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
      settings: {
          simulation: {
              length: 60,
              iterations: 10,
          },
          population: {
              size: 10000,
              initialInfected: 1,
          },
          virus: {
              incubation: {
                  mean: 5,
                  std: 1,
              },
              infectuous: {
                  mean: 3,
                  std: 1,
              }
          }
      },
  },
  mutations: {
      setVirusIncubationMean(state, payload: number) {
          state.settings.virus.incubation.mean = payload;
      },

      setVirusIncubationStd(state, payload: number) {
          state.settings.virus.incubation.std = payload;
      },

      setVirusInfectuousMean(state, payload: number) {
          state.settings.virus.infectuous.mean = payload;
      },

      setVirusInfectuousStd(state, payload: number) {
          state.settings.virus.infectuous.std = payload;
      },

      setSimulationLength(state, payload: number) {
          state.settings.simulation.length = payload;
      },

      setSimulationIterations(state, payload: number) {
          state.settings.simulation.iterations = payload;
      },

      setPopulationSize(state, payload: number) {
          state.settings.population.size = payload;
      },

      setInitialInfected(state, payload: number) {
          state.settings.population.initialInfected = payload;
      },

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
          for (let idx = 0; idx < state.settings.simulation.length; idx++) {
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
