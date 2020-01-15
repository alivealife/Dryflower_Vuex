<template>
  <div class="text-main">
    <!-- 錯誤訊息 -->
    <Alert></Alert>
    <!-- 讀取效果 -->
    <loading :active.sync="isLoading"></loading>
    <form class="form-signin" @submit.prevent="signin">
      <img
        class="mb-4"
        src="../assets/images/Dry Flower-logo/profile.png"
        alt
        width="300"
        height="300"
      />
      <h1 class="h3 mb-3 font-weight-normal text-center">請登入</h1>
      <label for="inputEmail" class="sr-only">信箱</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
        v-model="user.username"
      />
      <label for="inputPassword" class="sr-only">密碼</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
        v-model="user.password"
      />
      <button class="btn btn-lg btn-main btn-block" type="submit">登入</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
    </form>
  </div>
</template>

<script>
// 掛載錯誤訊息提示元件
import Alert from '../components/AlerMessage.vue';

export default {
  name: 'Login',
  components: {
    Alert,
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      isLoading: false,
    };
  },
  methods: {
    signin() {
      // 根據 API 文件，登入路徑為 /signin
      // 跨域的話要使用 /admin/signin
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      const vm = this;
      vm.isLoading = true;
      // 根據 API 文件，登入方法為 post
      this.$http.post(api, vm.user).then((response) => {
        // 如果 response.data.success 為 true 就回到首頁
        if (response.data.success) {
          vm.$router.push('/admin/products');
          vm.isLoading = false;
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'danger');
          vm.isLoading = false;
        }
      });
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  /* padding-top: 40px;
    padding-bottom: 40px; */
  background-color: #f8f9fa;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
