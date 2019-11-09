<template>
    <ul>
      <p>Nous avons trouvé {{journeys.length}} itinéraires</p>
      <journeyItem v-for="journey in journeys" :key="journey.id" :journey="journey"></journeyItem>
    </ul>
    
</template>

<script lang="ts">
import Vue from 'vue';
import JourneyItem from '@/components/JourneyItem/JourneyItem.vue';
import { mapState, mapGetters } from 'vuex';

export default Vue.extend({
  computed: {
      ...mapState('journey', ['journeys']),
  },
  components: {
      JourneyItem,
  },
  methods: {
  },
});
</script>

<style lang="scss" scoped>
    ul {
        padding-left: 0;
    }
</style>