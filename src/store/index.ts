import Vue from 'vue'
import Vuex from 'vuex'

import { Person, SetRunningCommit } from '@/interfaces';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      running: false,
      step: 0,
      stepLabel: '',
      population: [] as Person[],
  },
  mutations: {
      setPopulation(state, payload: Person[]) {
          state.population = payload;
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
