<template>
  <div>
    <Navbar />
    <div class="container-fluid">
      <div class="row">
        <Sidebar></Sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
// 將拆解後的 navbar 跟 sidebar 載入
import Sidebar from './Sidebar.vue';
import Navbar from './DashboardNavBar.vue';

export default {
  components: {
    Sidebar,
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/helpers/_dashboard.scss";
</style>
