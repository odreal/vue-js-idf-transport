<template>
  <section>
    <form @submit.prevent="getPlaces()">
        Départ
        <input type="text" v-model="firstPoint"/>
        Destinatin
        <input type="text" v-model="secondPoint"/>
        Heure d'arrivée souhaitée
        <input type="time" v-model="arrivalDate"/>
        <input type="submit" value="Rechercher"/>
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

        if(this.firstPoint.length&&this.secondPoint.length){
          this.$store.dispatch('journey/reset', {});
          this.$store.dispatch('journey/search', { firstPoint: this.firstPoint, secondPoint: this.secondPoint });
        }
        
      
    },
  },
});
</script>

<style lang="scss" scoped>
    form {
        display: flex;
        flex-direction: column;
    }
</style>