<template>
  <section>
    <h1>Plannification d'un itinéraire</h1>
    <p>Grace à cette page vous pouvez planifier un itinéraire en transport en commun entre deux destinations d'île de France.
      Vous pouvez choisir le trajet adapté à vos besoins et l'enregistrer pour y avoir accès quand vous le souhaitez.
    </p>
    <form @submit.prevent="getPlaces()">
        <div class="planner__input">
          <label for="firstPoint">Départ</label><input id="firstPoint" type="text" v-model="firstPoint" placeholder="Point de départ"/>
        </div>
        <div class="planner__input">
          <label for="secondPoint">Destination</label><input id="secondPoint" type="text" v-model="secondPoint" placeholder="Point d'arrivée"/>
        </div>
        <div class="planner__input">
          <label for="arrivalTime">Heure arrivée</label><input id="arrivalTime" type="time" v-model="arrivalDate" placeholder="Heure d'arrivée"/>
        </div>
        
        
        <input class="planner__input--search" type="submit" value="Rechercher"/>
    </form>
    <JourneyList/>
  </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import JourneyList from '@/components/JourneyList/JourneyList.vue';
    
    export default Vue.extend({
  data(): { firstPoint: string, secondPoint: string, arrivalDate: string } {
    return {
      firstPoint: '',
      secondPoint: '',
      arrivalDate: '',
    };
  },
  components: {
        JourneyList,
    },
  methods: {
    getPlaces(): void {
        if(this.firstPoint.length&&this.secondPoint.length&&this.arrivalDate.length){
          this.$store.dispatch('journey/reset', {});
          this.$store.dispatch('journey/search', { firstPoint: this.firstPoint, secondPoint: this.secondPoint, arrivalDate: this.arrivalDate });
        }
        
      
    },
  },
});
</script>

<style lang="scss" scoped>

    form {
        display: flex;
        flex-direction: column;
        background-color: #ffffff;
        padding-left: 5%;
        padding-right: 5%;
        box-shadow: 0 .125rem .25rem rgba(0,0,0,.075);
    }

    input {
    display: block;
    width: 90%;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    border: none;
    }

    .planner__input {
      display: flex;
      margin-top: 15px;
      
      
      & input {
        border: 1px solid #ced4da;
        border-left: none;
      }
      
      & label {
        border-radius: 3px 0px 0px 3px;
        background: #e9ecef;
        text-align: center;
        vertical-align: middle;
        align-self: center;
        padding: 12px;
        min-width: 80px;
        font-size: 0.75rem;
        border: 1px solid #ced4da;
      }
    }

    

    .planner__input--search {
      margin-top: 30px;
      align-self: center;
      border-radius: 3px;
      margin-bottom: 40px;
    }
</style>