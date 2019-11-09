<template>
  <li class="journey__step">
      <p class="journey__step--header"><span><b>De:</b> {{step.from}}</span><span><b>À:</b> {{step.to}}</span></p>
      <p class="journey__step--timer">
        <span><b>Départ :</b> {{step.hStart.getHours().toString().length > 1 ? step.hStart.getHours() : "0"+step.hStart.getHours()}}h{{step.hStart.getMinutes().toString().length > 1 ? step.hStart.getMinutes() : "0"+step.hStart.getMinutes()}}</span>
        <span><b>Arrivée :</b> {{step.hArrive.getHours().toString().length > 1 ? step.hArrive.getHours() : "0"+step.hArrive.getHours()}}h{{step.hArrive.getMinutes().toString().length > 1 ? step.hArrive.getMinutes() : "0"+step.hArrive.getMinutes()}}</span>
      </p>
      <p class="journey__step--path"><span><b>Transport:</b> {{step.mode}} {{step.code}}</span><span><b>Direction</b> : {{step.direction}}</span></p>
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
.journey__step {
  margin-bottom: 10px;
  list-style-type: none;
  font-size: 0.8rem;
  & .journey__step--header {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  & .journey__step--path {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  & .journey__step--timer {
    display:flex;
    align-items: center;
    margin-bottom: 0px;
    & span:last-child {
      margin-left: 5px;
    }
  }
}


</style>