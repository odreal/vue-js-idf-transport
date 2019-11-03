<template>
    <ul>
      <journeyItem v-for="journey in journeys" :key="journey.id" :journey="journey"></journeyItem>
      <button @click="testFn()">cliick</button>
    </ul>
    
</template>

<script lang="ts">
    import Vue from 'vue';
    import axios, { AxiosResponse } from "axios";
    import JourneyItem from '@/components/JourneyItem/JourneyItem.vue';
    import { mapState, mapGetters } from 'vuex';
    
    export default Vue.extend({
    computed: {
        ...mapState('journey', ['journeys'])
    },
    components: {
        JourneyItem,
    },
  methods: {
    testFn () {
      console.log(this.journeys)
   }
  },
});
</script>

<style lang="scss" scoped>
    ul {
        padding-left: 0;
    }
</style>