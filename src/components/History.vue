<template>
    <ul>
        <plannedItem v-for="plannedJourney in plannedJourneys" :key="plannedJourney.id" :journey="plannedJourney"></plannedItem>
    </ul>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { mapState, mapGetters } from 'vuex';
    import PlannedItem from '@/components/PlannedItem/PlannedItem.vue';
    
    export default Vue.extend({
        computed: {
            ...mapState('history', ['plannedJourneys']),
        },
        methods: {
        },
        components: {
            PlannedItem,
        },
    });
</script>

<style lang="scss">
    ul {
        list-style-type: none;
        padding: 0;
    }
</style>