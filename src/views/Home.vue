<template>
  <div id="app">
    <planner-box/>
    <History/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import History from '@/components/History.vue';
import PlannerBox from '@/components/PlannerBox.vue';

export default Vue.extend({
  name: 'app',
  components: {
    History,
    PlannerBox,
  },
});
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
