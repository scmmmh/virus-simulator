import Vue from 'vue'
import Vuex from 'vuex'

import { Person, SetRunningCommit } from '@/interfaces';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      running: false,
      step: 0,
      stepLabel: '',
      populations: [] as Person[][],
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
      }
  },
  actions: {
  },
  modules: {
  }
})
