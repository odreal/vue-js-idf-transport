<template>
  <li class="journey__item">
    <div class="journey__details">
      <div class="journey__details--time">
        <span>{{journey.hStart.getHours().toString().length > 1 ? journey.hStart.getHours() : "0"+journey.hStart.getHours()}}h{{journey.hStart.getMinutes().toString().length > 1 ? journey.hStart.getMinutes() : "0"+journey.hStart.getMinutes()}}</span>
        <i class="material-icons">arrow_downward</i>
        <span>{{journey.hArrive.getHours().toString().length > 1 ? journey.hArrive.getHours() : "0"+journey.hArrive.getHours()}}h{{journey.hArrive.getMinutes().toString().length > 1 ? journey.hArrive.getMinutes() : "0"+journey.hArrive.getMinutes()}}</span>
      </div>
      <span>Durée: {{Math.floor(journey.duration / 3600) }}h{{Math.floor((journey.duration - Math.floor(journey.duration / 3600) * 3600) / 60)}}min</span>
      <span>Emission: {{journey.c02}} gEC</span>
      
    </div>
    <div class="journey__steps">
      <h3>Détails de l'itinéraire</h3>
      <journeyStep v-for="step in journey.step" :key="step.id" :step="step"></journeyStep>
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
.journey__details {
  text-align: left;
  display: flex;
  flex-direction: column;
  width: 30%;
  border-right: 2px solid #0652DD;
  & span {
    margin-top: 5px;
    margin-left: 5px;
  }
}

.journey__details--time {
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  & span{
    font-weight: 900;
    font-size: 0.85rem;
    margin-top: 5px;
  }
}

.journey__item {
  display: flex;
  flex-direction: row;
  margin-bottom: 25px;
  background: rgba(255,255,255,0.2);
}
</style>