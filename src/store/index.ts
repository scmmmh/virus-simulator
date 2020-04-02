import Vue from 'vue'
import Vuex from 'vuex'

// eslint-disable-next-line
// @ts-ignore
import populationWorkerLoader from 'workerize-loader!@/webworkers/population';
// eslint-disable-next-line
// @ts-ignore
import spreadWorkerLoader from 'workerize-loader!@/webworkers/spread';
import { Person, VirusDayStats, VirusStats, SetRunningCommit, AddVirusStatsCommit, PopulationWorker, SpreadWorker } from '@/interfaces';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      initial: true,
      running: false,
      step: 0,
      stepLabel: '',
      populations: [] as Person[][],
      virusStats: [] as VirusDayStats[],
      settings: {
          simulation: {
              length: 120,
              iterations: 5,
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
      workers: {
          population: populationWorkerLoader() as PopulationWorker,
          spread: spreadWorkerLoader() as SpreadWorker,
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
          state.initial = false;
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
      async startSimulation({ commit, dispatch, state }) {
          commit('setRunning', {
              running: true,
              step: 0,
              stepLabel: 'Starting up',
          });
          commit('clearPopulations');
          commit('clearVirusStats');
          let population = await state.workers.population.generatePopulation(state.settings.population, state.settings.virus);
          commit('addPopulation', population);
          dispatch('runSimulation');
          for (let idx1 = 0; idx1 < state.settings.simulation.iterations - 1; idx1++) {
              population = await state.workers.population.generatePopulation(state.settings.population, state.settings.virus);
              commit('addPopulation', population);
          }
      },

      async runSimulation({ commit, state }) {
          for (let idx1 = 0; idx1 < state.settings.simulation.iterations; idx1++) {
              let population = state.populations[idx1];
              for (let idx2 = 0; idx2 < state.settings.simulation.length; idx2++) {
                  commit('setRunning', {
                      running: true,
                      step: idx1 * state.settings.simulation.length + idx2,
                      stepLabel: 'Running simulation #' + (idx1 + 1) + ', day ' + (idx2 + 1),
                  });
                  population = await state.workers.spread.step(population, idx2, state.settings.virus);
                  const stats = {
                      infected: 0,
                      newInfected: 0,
                      infectuous: 0,
                  } as VirusStats;
                  population.forEach((person: Person) => {
                      if (person.infected !== null) {
                          stats.infected++;
                          if (person.infected === idx2) {
                              stats.newInfected++;
                          }
                          if (person.incubation !== null && person.infectuous !== null && person.incubation < idx2 && idx2 <= person.infectuous) {
                              stats.infectuous++;
                          }
                      }
                  });
                  commit('addVirusStats', {
                      day: idx2,
                      stats: stats,
                  });
              }
              commit('setRunning', {
                  running: false,
                  step: 0,
                  stepLabel: 'Completed',
              });
          }
      },
  },
  modules: {
  }
})
