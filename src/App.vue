<template>
  <div id="app">
    <loading :active.sync="isLoading"></loading>
    <!-- 錯誤訊息 -->
    <Alert></Alert>
    <router-view/>
  </div>
</template>

<script>
import Alert from './components/AlerMessage.vue';

export default {
  name: 'App',
  components: {
    Alert,
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/all.scss";
</style>
