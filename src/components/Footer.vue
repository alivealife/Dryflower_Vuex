<template>
  <div>
    <footer class="py-3 mt-3 border-top">
      <div class="container">
        <ul class="list-inline text-center">
          <li class="list-inline-item h2">
            <a href="#">
              <i class="fab fa-github fa-fw"></i>
            </a>
          </li>
          <li class="list-inline-item h2">
            <a href="#">
              <i class="fab fa-facebook fa-fw"></i>
            </a>
          </li>
          <li class="list-inline-item h2">
            <a href="#">
              <i class="fab fa-instagram fa-fw"></i>
            </a>
          </li>
        </ul>
        <p class="text-center text-main">個人練習作品</p>
        <div class="text-center">
          <a href="#" class="h4 hide-login" @click.prevent="signinCheck">
            <i class="fas fa-user-cog"></i>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  methods: {
    // 驗證有沒有登入，有登入就直接進 Dashboard，沒有就進 Login
    signinCheck() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$router.push('/admin/products');
        } else {
          vm.$router.push('/Login');
        }
      });
    },
  },
};
</script>
