<template>
  <div>
    <Navbar />
    <!-- 錯誤訊息用標籤 -->
    <Alert></Alert>
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
// 掛載錯誤訊息提示元件
import Alert from './AlerMessage.vue';

export default {
  components: {
    Sidebar,
    Navbar,
    // 將元件放入
    Alert,
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/_dashboard.scss";
</style>
