<template>
  <li>
      <div class="journey__item">
        <div class="journey__details--time">
          <span>{{journey.hStart.getHours().toString().length > 1 ? journey.hStart.getHours() : "0"+journey.hStart.getHours()}}h{{journey.hStart.getMinutes().toString().length > 1 ? journey.hStart.getMinutes() : "0"+journey.hStart.getMinutes()}}</span>
          <i class="material-icons">arrow_downward</i>
          <span>{{journey.hArrive.getHours().toString().length > 1 ? journey.hArrive.getHours() : "0"+journey.hArrive.getHours()}}h{{journey.hArrive.getMinutes().toString().length > 1 ? journey.hArrive.getMinutes() : "0"+journey.hArrive.getMinutes()}}</span>
        </div>
        <div class="journey__details--recap">
          <span>Itinéraire n°{{journey.id}}</span>
          <span>Nombre de correspondance: {{journey.step.length}}</span>
          <span>Durée: {{Math.floor(journey.duration / 3600) }}h{{Math.floor((journey.duration - Math.floor(journey.duration / 3600) * 3600) / 60)}}min</span>
          <span>Emission: {{journey.c02}} gEC</span>
        </div>
      </div>
      <div class="journey__steps">
        <h3>Détails de l'itinéraire</h3>
        <journeyStep class="journey__steps--details" v-for="step in journey.step" :key="step.id" :step="step"></journeyStep>
    </div>
  </li>
</template>

<script lang="ts">
import Vue from 'vue';
import JourneyStep from '@/components/JourneyStep/JourneyStep.vue';
import Journey from '@/models/journey';

export default Vue.extend({
  components: {
        JourneyStep,
    },
  props: {
    journey: Object as () => Journey,
  },
  watch: {
    
  },
  methods: {
    
  },
});
</script>

<style lang="scss">
li {
  background: #ffffff;
}

.journey__details--time {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  width: 30%;
  border-right: 1px solid #ced4da;
  font-size: 0.8rem;
}

.journey__details--recap {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  
  & span {
    text-align: left;
    font-size: 0.9rem;
    margin-top: 2px;
    margin-left: 4px;
  }
}

.journey__item {
  display: flex;
  flex-direction: row;
  background: rgba(255,255,255,1);
  border-bottom: 1px solid #ced4da;
  border-top: 1px solid #ced4da;
  margin-top: 10px;
}

.journey__steps {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  
  & .journey__steps--details {
    width: 100%;
    padding-left: 5px;
  }

  & .journey__steps--details:nth-child(even) {
  background: rgba(0,0,0,0.05);
}

  & h3 {
    text-align: left;
    font-size: 0.9rem;
  }
}
</style>