<template>
  <li>
      <div class="journey__item">
        <div class="journey__details--time">
          <span>{{journey.hStart.hours}}h{{journey.hStart.minutes}}</span>
          <i class="material-icons">arrow_downward</i>
          <span>{{journey.hArrive.hours}}h{{journey.hArrive.minutes}}</span>
        </div>
        <div class="journey__details--recap">
          <span>Itinéraire n°{{journey.order}}</span>
          <span>Nombre de correspondance: {{journey.step.length}}</span>
          <span>Durée: {{Math.floor(journey.duration / 3600) }}h{{Math.floor((journey.duration - Math.floor(journey.duration / 3600) * 3600) / 60)}}min</span>
          <span>Emission CO2: {{journey.c02}} gEC</span>
        </div>
      </div>
      <button class="journey__save" v-on:click="saveJourney()"><i class="material-icons">{{saveIcon}}</i><span>{{saveMessage}}</span></button>
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
  data(): { saveMessage: string, saveIcon: string } {
    return {
      saveMessage: 'Enregistrer l\'itinéraire',
      saveIcon: 'post_add',
    };
  },
  components: {
    JourneyStep,
  },
  props: {
    journey: Object as () => Journey,
  },
  watch: {
  },
  methods: {
    saveJourney(): void {
      if (this.saveIcon === 'done') {
        return;
      }
      this.$store.dispatch('history/add', {
        id: this.journey.id,
        hStart: this.journey.hStart,
        hArrive: this.journey.hArrive,
        duration: this.journey.duration,
        co2: this.journey.c02,
        step: this.journey.step,
      });
      this.saveIcon = 'done';
      this.saveMessage = 'Enregistré avec succès';
    },
  },
});
</script>

<style lang="scss">
li {
  background: #FAF9F9;
}

.journey__details--time {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  width: 20%;
  font-size: 0.8rem;
}

.journey__details--recap {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 5px 0 5px 0;
  border-left: 1px solid #5D5D81;
  
  
  & span {
    text-align: left;
    font-size: 0.9rem;
    margin-top: 2px;
    margin-left: 4px;
  }
}

.journey__save {
  background: #5D5D81;
  color: #FFFFFF;
  border-radius: 3px;
  width: 75%;
  padding: .1rem .25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: none;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
  margin-left: 5px;
}

.journey__item {
  display: flex;
  flex-direction: row;
  background: #B0D7FF;
  border-bottom: 1px solid #5D5D81;
  border-top: 1px solid #5D5D81;
  margin-top: 10px;
}

.journey__steps {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  
  & .journey__steps--details {
    width: calc(100% - 5px);
    padding-left: 5px;
  }

  & .journey__steps--details:nth-child(even) {
  background: rgba(0,0,0,0.05);
}

  & h3 {
    text-align: left;
    font-size: 0.9rem;
    margin-left: 5px;
  }
}
</style>