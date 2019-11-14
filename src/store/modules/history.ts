import Journey from '@/models/journey';
import FormatedDate from '@/models/formatedDate';
import Step from '@/models/step';
import { getStoredJourneys } from '@/utils/utils';
import { Module } from 'vuex';



const history: Module<{ plannedJourneys: Journey[] }, any> = {
  namespaced: true,
  state: {
    plannedJourneys: getStoredJourneys(),
  },
  getters: {
  },
  mutations: {
    add(state, payload: {
      id: number,
      hStart: FormatedDate,
      hArrive: FormatedDate,
      c02: number,
      duration: number,
      step: Step[] }) {
        state.plannedJourneys.push({
          id: payload.id,
          order: 0,
          hStart: payload.hStart,
          hArrive: payload.hArrive,
          c02: payload.c02,
          duration: payload.duration,
          step: payload.step,
        });
    },
    modifyPlannedJourneys(state, payload: {plannedJourneys: Journey[]}) {
      state.plannedJourneys = payload.plannedJourneys;
    },
  },
  actions: {
    add(context, payload: {
      id: number,
      hStart: FormatedDate,
      hArrive: FormatedDate,
      duration: number,
      co2: number,
      step: Step[] }) {
        const tmpObject = {
            id: payload.id,
            hStart: payload.hStart,
            hArrive: payload.hArrive,
            duration: payload.duration,
            c02: payload.co2,
            step: payload.step };
        const tmpStorage = localStorage.getItem('journeys');
        const storage = tmpStorage ? JSON.parse(tmpStorage) : [];
        if (storage.filter((journey: Journey) => (journey.id === payload.id)).length > 0) {
          return;
        }
        storage.push(tmpObject);
        localStorage.setItem('journeys', JSON.stringify(storage));
        context.commit('add', {
            hStart: payload.hStart,
            hArrive: payload.hArrive,
            duration: payload.duration,
            c02: payload.co2,
            step: payload.step },
        );
    },
    remove(context, payload: {id: number}) {
      const tmpStorage = localStorage.getItem('journeys');
      const storage = tmpStorage ? JSON.parse(tmpStorage) : [];
      let searchStorage = storage.filter((journey: Journey) => (journey.id !== payload.id));
      if (searchStorage.length === 0) {
        searchStorage = [];
      }
      localStorage.setItem('journeys', JSON.stringify(searchStorage));
      context.commit('modifyPlannedJourneys', {plannedJourneys: searchStorage});
    },
  },
};

export default history;
