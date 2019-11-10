import Journey from '@/models/journey';
import FormatedDate from '@/models/formatedDate'
import CooPoint from '@/models/cooPoint';
import Step from '@/models/step';
import { getRandomId, parseDate } from '@/utils/utils';
import { Module } from 'vuex';
import axios, { AxiosResponse } from 'axios';

const journey: Module<{ journeys: Journey[] }, any> = {
  namespaced: true,
  state: {
    journeys: [],
  },
  getters: {
  },
  mutations: {
    add(state, payload: { order: number, hStart: FormatedDate, hArrive: FormatedDate, c02: number, duration: number, step: Step[]  }) {
      state.journeys.push({
        id: getRandomId(),
        order: payload.order,
        hStart: payload.hStart,
        hArrive: payload.hArrive,
        c02: payload.c02,
        duration: payload.duration,
        step: payload.step,
      });
    },
    reset(state, payload: {}) {
      state.journeys = [];
    },
  },
  actions: {
    add(context, payload: { price: number, duration: number, step: Step[] }) {
      context.commit('add', payload);
    },

    reset(context, payload: {}) {
      context.commit('reset', payload);
    },

    search(context, payload: {firstPoint: string, secondPoint: string, arrivalDate: string}) {
      let tmpCoordinate: CooPoint[] = [];

      // Parse Time to create an ISO Date
      const arrivalDateArray = payload.arrivalDate.split(':');
      const arrivalDate = new Date();
      arrivalDate.setHours(parseInt(arrivalDateArray[0], 10));
      arrivalDate.setMinutes(parseInt(arrivalDateArray[1], 10));
      const arrivalDateString = arrivalDate.toISOString();

      // Create two request to convert address to geopos
      axios.get(
        'https://api.navitia.io/v1/coverage/fr-idf/places?q=' + payload.firstPoint,
        {headers: {Authorization : 'edddfa70-8fbf-4d51-a4c9-e075416c639d'}},
      )
      .then((response) => (getCoordinate(response, 0)));

      axios.get(
        'https://api.navitia.io/v1/coverage/fr-idf/places?q=' + payload.secondPoint,
        {headers: {Authorization : 'edddfa70-8fbf-4d51-a4c9-e075416c639d'}},
      )
      .then((response) => (getCoordinate(response, 1)));
      function getCoordinate(response: AxiosResponse, index: number): void {
        // Check what kind of place it is and push it into the result array
        if (response.data.places[0].administrative_region !== undefined) {
          tmpCoordinate.push({order: index, coord: response.data.places[0].administrative_region.coord});
        } else {
          tmpCoordinate.push({order: index, coord: response.data.places[0].stop_area.coord});
        }
        // Check if we have all of our geopos
        if (tmpCoordinate.length >= 2) {
          // Order array
          tmpCoordinate = tmpCoordinate.sort((a, b) => (a.order > b.order) ? 1 : -1);
          getRoute();
        }
      }

      function getRoute(): void {
          // Fetching all journeys for our geopos and the arrival time
          const to = 'to=' + tmpCoordinate[1].coord.lon + ';' + tmpCoordinate[1].coord.lat;
          const from = '&from=' + tmpCoordinate[0].coord.lon + ';' + tmpCoordinate[0].coord.lat;
          const askedTime = '&datetime_represents=arrival&datetime=' + arrivalDateString;
          axios.get(
                    'https://api.navitia.io/v1/coverage/fr-idf/journeys?' + to + from + askedTime,
                    {headers: {Authorization : 'edddfa70-8fbf-4d51-a4c9-e075416c639d'}},
                  )
                  .then((response) => (getJourneys(response)));
      }

      function getJourneys(response: AxiosResponse): void {
        // Creating array of step for each journey then push it into journeys state
        let indexJourney: number = 1;
        response.data.journeys.forEach((element: any) => {
          const tmpArray: object[] = [];
          let indexStep: number = 1;
          element.sections.forEach((section: any) => {
            if (section.display_informations !== undefined) {
                const tmpObject = { id: indexStep,
                  from: section.from.name,
                  to: section.to.name,
                  mode: section.display_informations.commercial_mode,
                  code: section.display_informations.code,
                  direction: section.display_informations.direction,
                  hStart: parseDate(element.departure_date_time),
                  hArrive: parseDate(element.arrival_date_time),
                };
                tmpArray.push(tmpObject);
                indexStep++;
            }
          });
          if (tmpArray.length > 0) {
            context.commit('add', {
              order: indexJourney,
              hStart: parseDate(element.departure_date_time),
              hArrive: parseDate(element.arrival_date_time),
              duration: element.duration,
              c02: element.co2_emission.value,
              step: tmpArray },
            );
            indexJourney++;
          }
        });
      }
    },
  },
};

export default journey;
