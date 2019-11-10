<template>
  <div id="app">
    <h1>Mes itinéraires planifiés</h1>
    <p>Vous pouvez retrouver l'ensemble de vos itinéraires planifiés (les itinéraires passés et à venir).</p>
    <History/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import History from '@/components/History.vue';

export default Vue.extend({
  name: 'app',
  components: {
    History,
  },
});
</script>
