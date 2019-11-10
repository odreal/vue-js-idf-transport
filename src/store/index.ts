import journey from '@/store/modules/journey.ts';
import history from '@/store/modules/history.ts';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    journey,
    history,
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
});
