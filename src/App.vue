<template>
  <div id="app">
    <loading :active.sync="isLoading"></loading>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {

  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  created() {

  },
};
</script>

<style lang="scss">
@import "./assets/all";
</style>
