import Journey from '@/models/journey';
import CooPoint from '@/models/cooPoint';
import Step from '@/models/step';
import { getRandomId, parseDate } from '@/utils/utils';
import { Module } from 'vuex';
import axios, { AxiosResponse } from "axios";

const journey: Module<{ journeys: Journey[] }, any> = {
  namespaced: true,
  state: {
    journeys: [],
  },
  getters: {
  },
  mutations: {
    add(state, payload: { id: number, hStart: Date, hArrive: Date, c02: number, duration: number, step: Array<Step>  }) {
      state.journeys.push({
        id: payload.id,
        hStart: payload.hStart,
        hArrive: payload.hArrive,
        c02: payload.c02,
        duration: payload.duration,
        step: payload.step,
      });
    },
    reset(state, payload: {}) {
      state.journeys = []
    },
  },
  actions: {
    add(context, payload: { price: number, duration: number, step: Array<Step> }) {
      context.commit('add', payload);
    },

    reset(context, payload: {}) {
      context.commit('reset', payload);
    },

    search(context, payload: {firstPoint: String, secondPoint: String, arrivalDate: String}) {
      var tmpCoordinate: Array<CooPoint> = []
      console.log(payload.arrivalDate);
      var arrivalDateArray = payload.arrivalDate.split(":");
      var arrivalDate = new Date();
      arrivalDate.setHours(parseInt(arrivalDateArray[0]))
      arrivalDate.setMinutes(parseInt(arrivalDateArray[1]))
      var arrivalDateString = arrivalDate.toISOString();
      console.log(arrivalDateString);


      axios.get(
        'https://api.navitia.io/v1/coverage/fr-idf/places?q='+payload.firstPoint,
        {headers: {
            "Authorization" : "edddfa70-8fbf-4d51-a4c9-e075416c639d"
          }
        }
      )
      .then(response => (getCoordinate(response, 0)))

      axios.get(
        'https://api.navitia.io/v1/coverage/fr-idf/places?q='+payload.secondPoint,
        {headers: {
            "Authorization" : "edddfa70-8fbf-4d51-a4c9-e075416c639d"
          }
        }
      )
      .then(response => (getCoordinate(response, 1)))
      
      function getCoordinate(response: AxiosResponse, index: number): void {
        if(response.data.places[0].administrative_region != undefined){
          tmpCoordinate.push({'order': index, 'coord': response.data.places[0].administrative_region.coord})
        } else {
          tmpCoordinate.push({'order': index, 'coord': response.data.places[0].stop_area.coord})
        }
  
        if(tmpCoordinate.length >= 2){
          tmpCoordinate = tmpCoordinate.sort((a, b) => (a.order > b.order) ? 1 : -1)
          getRoute()
        }
      }

      function getRoute(): void {
          axios.get(
                    'https://api.navitia.io/v1/coverage/fr-idf/journeys?to='+tmpCoordinate[1].coord.lon+';'+tmpCoordinate[1].coord.lat+'&from='+tmpCoordinate[0].coord.lon+';'+tmpCoordinate[0].coord.lat+'&datetime_represents=arrival&datetime='+arrivalDateString,
                    {headers: {
                        "Authorization" : "edddfa70-8fbf-4d51-a4c9-e075416c639d"
                      }
                    }
                  )
                  .then(response => (getJourneys(response)))
      }

      function getJourneys(response: AxiosResponse): void {
        var indexJourney: number = 1;
        response.data.journeys.forEach(element => {
          var tmpArray: Array<object> = []
          var indexStep: number = 1;
          element.sections.forEach(section => {
            if(section.display_informations != undefined){
                var tmpObject = {'id': indexStep, 'from': section.from.name, 'to': section.to.name,'mode':section.display_informations.commercial_mode, 'code': section.display_informations.code, 'direction': section.display_informations.direction, 'hStart': new Date(parseDate(section.base_departure_date_time)), 'hArrive': new Date(parseDate(section.base_arrival_date_time)) }
                tmpArray.push(tmpObject)
                indexStep++;
            }
          });
          if(tmpArray.length>0){
            context.commit('add', { 'id': indexJourney, hStart: new Date(parseDate(element.departure_date_time)), hArrive: new Date(parseDate(element.arrival_date_time)), duration: element.duration, c02: element.co2_emission.value, step: tmpArray });
            indexJourney++;
          }
        });
      }
    }
  },
};

export default journey;
