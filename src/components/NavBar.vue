<template>
  <div>
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <router-link class="navbar-brand mr-0" href="#" to="/">
          <h1 class="mb-0">
            <img
              src="../assets/images/Dry Flower-logo/default_cut.png"
              alt="Dry Flower"
              width="220px"
            />
          </h1>
        </router-link>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item" :class="{'active': pathCheck == '/'}">
              <router-link class="nav-link" href="#" to="/">首頁</router-link>
            </li>
            <li class="nav-item" :class="{'active': pathCheck == '/productlist'}">
              <router-link class="nav-link" href="#" to="/productlist">商品列表</router-link>
            </li>
            <li class="nav-item" :class="{'active': pathCheck == '/contact'}">
              <router-link class="nav-link" href="#" to="/contact">聯絡我們</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    pathCheck() {
      return this.$route.path;
    },
  },
};
</script>
