<template>
  <li class="journeyItem">
      <p>{{step.from}} => {{step.to}}</p>
      <p>
        Départ : {{step.hStart.getHours().toString().length > 1 ? step.hStart.getHours() : "0"+step.hStart.getHours()}}h{{step.hStart.getMinutes().toString().length > 1 ? step.hStart.getMinutes() : "0"+step.hStart.getMinutes()}}
        Arrivée : {{step.hArrive.getHours().toString().length > 1 ? step.hArrive.getHours() : "0"+step.hArrive.getHours()}}h{{step.hArrive.getMinutes().toString().length > 1 ? step.hArrive.getMinutes() : "0"+step.hArrive.getMinutes()}}
        </p>
      <p>{{step.mode}} {{step.code}} Direction : {{step.direction}}</p>
 </li>
</template>

<script lang="ts">
import Vue from 'vue';
import Step from '@/models/step';

export default Vue.extend({
  props: {
    step: Object as () => Step,
  },
});
</script>

<style lang="scss" scoped>
.journeyItem {
  list-style-type: none;
  background-color: #F5F5F5;
}
</style>