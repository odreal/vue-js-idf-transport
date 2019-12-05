import Journey from '@/models/journey';
import FormatedDate from '@/models/formatedDate';
import { MutationTree } from 'vuex';
import history from './history';

const mutations = history.mutations as MutationTree<{plannedJourneys: Journey[]}>;
let state: { plannedJourneys: Journey[] };

describe('history', () => {
  const formatedDate = {
    dateValue: new Date(),
    stringifiedDate: '10:10',
    hours: 10,
    minutes: 10,
  };
  const step = [{
    id: 4842184,
    from: 'Paris',
    to: 'Versailles',
    mode: 'RER',
    code: 'A',
    direction: 'Versailles',
    hStart: formatedDate,
    hArrive: formatedDate,
  }];
  beforeEach(() => {
    state = {
        plannedJourneys: [
        { id: 84116611818, order: 0, hStart: formatedDate, hArrive: formatedDate, c02: 10, duration: 100, step},
        { id: 84875622348, order: 1, hStart: formatedDate, hArrive: formatedDate, c02: 15, duration: 150, step},
      ],
    };
  });
  it('should add a journey', () => {
    mutations.add(
      state, {
        order: 6,
        hStart: formatedDate,
        hArrive: formatedDate,
        c02: 50,
        duration: 150,
        step,
    });
    expect(state.plannedJourneys.length).toEqual(3);
    expect(typeof state.plannedJourneys[2].order).toEqual('number');
    /// Check for FormatedDate correctly filled
    expect(typeof state.plannedJourneys[2].hStart.dateValue).toEqual('object');
    expect(typeof state.plannedJourneys[2].hStart.stringifiedDate).toEqual('string');
    expect(typeof state.plannedJourneys[2].hStart.hours).toEqual('number');
    expect(typeof state.plannedJourneys[2].hStart.minutes).toEqual('number');
    /// Check for FormatedDate correctly filled
    expect(typeof state.plannedJourneys[2].hArrive.dateValue).toEqual('object');
    expect(typeof state.plannedJourneys[2].hArrive.stringifiedDate).toEqual('string');
    expect(typeof state.plannedJourneys[2].hArrive.hours).toEqual('number');
    expect(typeof state.plannedJourneys[2].hArrive.minutes).toEqual('number');
    expect(typeof state.plannedJourneys[2].c02).toEqual('number');
    expect(typeof state.plannedJourneys[2].duration).toEqual('number');
    /// Check for Step correctly filled
    expect(typeof state.plannedJourneys[2].step[0].id).toEqual('number');
    expect(typeof state.plannedJourneys[2].step[0].from).toEqual('string');
    expect(typeof state.plannedJourneys[2].step[0].to).toEqual('string');
    expect(typeof state.plannedJourneys[2].step[0].mode).toEqual('string');
    expect(typeof state.plannedJourneys[2].step[0].code).toEqual('string');
    expect(typeof state.plannedJourneys[2].step[0].direction).toEqual('string');
    expect(typeof state.plannedJourneys[2].step[0].hStart).toEqual('object');
    expect(typeof state.plannedJourneys[2].step[0].hArrive).toEqual('object');
  });
});
