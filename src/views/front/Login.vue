<template>
  <div class="text-main">
    <form class="form-signin" @submit.prevent="signin">
      <img
        class="mb-4"
        src="../../assets/images/Dry Flower-logo/profile.png"
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

export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      // 根據 API 文件，登入路徑為 /signin
      // 跨域的話要使用 /admin/signin
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      const vm = this;
      vm.$store.state.isLoading = true;
      // 根據 API 文件，登入方法為 post
      vm.$http.post(api, vm.user).then((response) => {
        // 如果 response.data.success 為 true 就回到首頁
        if (response.data.success) {
          vm.$router.push('/admin/products');
          vm.$store.state.isLoading = false;
        } else {
          const { message } = response.data;
          const status = 'danger';
          vm.$store.dispatch('updateMessage', { message, status });
          vm.$store.state.isLoading = false;
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
