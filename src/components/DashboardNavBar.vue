<template>
  <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <router-link class="navbar-brand col-sm-3 col-md-2 mr-0" href="#" to="/">
    Dry Flower</router-link>
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="#" @click.prevent="signout">登出</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    signout() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$router.push('/login');
        }
      });
    },
  },
};
</script>
