<template>
  <div>
    <header>
      <NavBar />
    </header>
    <div>
      <ol class="stepBar pl-0">
        <li class="visited">
          <span>1</span>
          <br />輸入資料
        </li>
        <li class="visited">
          <span>2</span>
          <br />確認付款
        </li>
        <li :class="{'visited': order.is_paid === true}">
          <span>3</span>
          <br />完成
        </li>
      </ol>
    </div>
    <!-- 未付款時顯示 -->
    <div class="container" v-if="order.is_paid === false">
      <div class="my-5 row justify-content-center">
        <form class="col-md-6" @submit.prevent="payOrder">
          <a
            class="btn btn-sub btn-block"
            data-toggle="collapse"
            href="#collapseExample"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >購物清單</a>
          <div class="collapse" id="collapseExample">
            <table class="table">
              <thead>
                <th>品名</th>
                <th>數量</th>
                <th width="50">單價</th>
              </thead>
              <tbody>
                <tr v-for="item in order.products" :key="item.id">
                  <td class="align-middle">
                    <img
                      :src="item.product.imageUrl"
                      style="height: 40px; width: 38px"
                      class="img-thumbnail mr-3"
                    />
                    {{ item.product.title }}
                  </td>
                  <td class="align-middle">{{ item.qty }} / {{ item.product.unit }}</td>
                  <td class="align-middle text-right">{{ item.final_total | currency }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" class="text-right">總計</td>
                  <td class="text-right">{{ order.total | currency}}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <table class="table mt-4">
            <tbody>
              <tr>
                <th width="150" class="border-top-0">Email</th>
                <td class="border-top-0">{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>收件人電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <span v-if="!order.is_paid" class="text-danger font-weight-bold">尚未付款</span>
                  <span v-else class="text-success">付款完成</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-right" v-if="order.is_paid === false">
            <button class="btn btn-danger">確認付款去</button>
          </div>
        </form>
      </div>
    </div>
    <!-- 付款完成後顯示 -->
    <div class="container" v-else>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
        <circle
          class="path circle"
          fill="none"
          stroke="#AF945E"
          stroke-width="6"
          stroke-miterlimit="10"
          cx="65.1"
          cy="65.1"
          r="62.1"
        />
        <polyline
          class="path check"
          fill="none"
          stroke="#AF945E"
          stroke-width="6"
          stroke-linecap="round"
          stroke-miterlimit="10"
          points="100.2,40.2 51.5,88.8 29.8,67.5 "
        />
      </svg>
      <p class="success font-weight-bold h3">付款完成</p>
      <div class="d-flex justify-content-center mt-4">
        <router-link class="btn btn-main" to="/productlist">
          <i class="fas fa-shopping-cart"></i> 繼續購物
        </router-link>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from '../../components/NavBar.vue';
import Footer from '../../components/Footer.vue';

export default {
  name: 'Pay',
  components: {
    NavBar,
    Footer,
  },
  data() {
    return {
      orderId: '',
      order: {
        user: {},
        is_paid: false,
      },
    };
  },
  methods: {
    // 取得訂單
    getOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`;
      vm.$http.get(api).then((response) => {
        vm.order = response.data.order;
      });
    },
    // 付款確認
    payOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;
      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.getOrder();
        }
      });
    },
  },
  created() {
    // 取得訂單 ID
    // orderId 對應的是 index.js 設定的路由，要相同才能抓到
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
};
</script>
