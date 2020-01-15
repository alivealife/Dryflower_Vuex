<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <!-- eslint-disable -->
      <h6
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"      
      >
      <!-- eslint-disable -->
        <span>管理員</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link
            class="nav-link text-main"
            to="/admin/products"
            :class="{'active': pathCheck == '/admin/products'}"
          >
            <i class="fas fa-box-open fa-fw"></i> 產品列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link text-main"
            to="/admin/orders"
            :class="{'active': pathCheck == '/admin/orders'}"
          >
            <i class="fas fa-clipboard-list fa-fw"></i> 訂單列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link text-main"
            to="/admin/coupon"
            :class="{'active': pathCheck == '/admin/coupon'}"
          >
            <i class="fas fa-percent fa-fw"></i> 優惠券
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
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
