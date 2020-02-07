<template>
  <div>
    <header>
      <NavBar />
    </header>
    <div>
      <ol class="stepBar">
        <li class="visited">
          <span>1</span>
          <br />輸入資料
        </li>
        <li>
          <span>2</span>
          <br />確認付款
        </li>
        <li>
          <span>3</span>
          <br />完成
        </li>
      </ol>
    </div>
    <div class="container">
      <div class="row flex-row-reverse">
        <!-- 購物車內容區 -->
        <div class="col-md-5 mb-3">
          <table class="table">
            <thead>
              <tr>
                <th colspan="4" class="border-top-0 h4 text-main pt-0">已選購商品</th>
              </tr>
            </thead>
            <tbody>
              <!-- item.id 具唯一性，所以 key 使用 item.id -->
              <tr v-for="(item) in cartItem.carts" :key="item.id">
                <td width="30px">
                  <!-- 移除購物車商品(要帶入商品 ID) -->
                  <button class="btn btn-outline-danger" @click="removeCartItem(item.id)">
                    <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadingItem"></i>
                    <i class="far fa-trash-alt" v-else></i>
                  </button>
                </td>
                <td>
                  <img
                    :src="item.product.imageUrl"
                    style="height: 40px; width: 38px"
                    class="img-thumbnail"
                  />
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">已套用優惠券</div>
                </td>
                <td width="80">{{ item.qty }} / {{ item.product.unit }}</td>
                <td class="text-right">{{ item.total | currency }}</td>
              </tr>
              <tr>
                <td colspan="3" class="text-right h4">總計</td>
                <td
                  colspan="1"
                  class="text-right h4"
                  :class="{'through-line': cartItem.final_total !== cartItem.total}"
                >{{ cartItem.total | currency }}</td>
              </tr>
              <!-- 有折扣才會顯示折扣價 -->
              <tr v-if="cartItem.final_total !== cartItem.total">
                <td colspan="3" class="text-right text-success h3">折扣價</td>
                <td
                  colspan="1"
                  class="text-right text-success h3"
                >{{ cartItem.final_total | currency }}</td>
              </tr>
            </tbody>
          </table>
          <p class="text-main">輸入 costdown 獲得優惠價格</p>
          <!-- 優惠碼用 -->
          <div class="input-group mb-3">
            <!-- 跟 coupon_code 綁定 -->
            <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼" />
            <div class="input-group-append">
              <button class="btn btn-outline-third" type="button" @click="addCouponCode">
                套用優惠碼</button>
            </div>
          </div>
        </div>
        <!-- 顧客資料區 -->
        <!-- 放在 form 標籤上，並取消 submit 預設事件 -->
        <ValidationObserver
          class="col-md-7 font-weight-bolder"
          ref="observer"
          v-slot="{ invalid }"
          tag="form"
          @submit.prevent="createOrder"
        >
          <h4 class="text-main">顧客資料</h4>
          <div class="form-row mb-3">
            <ValidationProvider name="姓名" rules="required" v-slot="{ errors }" class="col-md-6">
              <label for="username" class="text-main">收件人姓名</label>
              <input
                type="text"
                class="form-control"
                name="name"
                id="username"
                v-model="form.user.name"
                placeholder="輸入姓名"
                :class="{'is-invalid': errors[0]}"
              />
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              name="電話"
              rules="required|min:10"
              v-slot="{ errors }"
              class="col-md-6"
            >
              <label for="usertel" class="text-main">收件人電話</label>
              <input
                type="tel"
                class="form-control"
                id="usertel"
                v-model="form.user.tel"
                placeholder="請輸入電話"
                :class="{'is-invalid': errors[0]}"
              />
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <ValidationProvider
              name="Email"
              rules="required|email"
              v-slot="{ errors }"
              ref="emailField"
            >
              <label for="useremail" class="text-main">Email</label>
              <input
                type="email"
                class="form-control"
                name="email"
                id="useremail"
                v-model="form.user.email"
                placeholder="請輸入 Email"
                :class="{'is-invalid': errors[0]}"
              />
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <ValidationProvider name="地址" rules="required" v-slot="{ errors }">
              <label for="useraddress" class="text-main">收件人地址</label>
              <input
                type="text"
                class="form-control"
                name="address"
                id="useraddress"
                v-model="form.user.address"
                placeholder="請輸入地址"
                :class="{'is-invalid': errors[0]}"
              />
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="comment" class="text-main">
              留言
              <span class="text-muted">(選填)</span>
            </label>
            <textarea
              name
              id="comment"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="text-right">
            <button class="btn btn-main btn-block" :disabled="invalid">送出訂單</button>
          </div>
        </ValidationObserver>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NavBar from '../../components/NavBar.vue';
import Footer from '../../components/Footer.vue';

export default {
  name: 'Checkout',
  components: {
    NavBar,
    Footer,
  },
  data() {
    return {
      // 顧客資料用
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      // 把 coupon_code 存在這
      coupon_code: '',
    };
  },
  methods: {
    // 取得購物車內容
    getCart(open) {
      this.$store.dispatch('cartModules/getCart', open);
    },
    // 刪除購物車內容
    removeCartItem(id) {
      this.$store.dispatch('cartModules/removeCartItem', id);
      if (!this.$store.dispatch('cartItem')) {
        setTimeout(() => {
          this.$router.push('/productlist');
        }, 1200);
      }
    },
    // 套用折扣碼
    addCouponCode() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      vm.$store.dispatch('updateLoading', true);
      // 根據 API 格式將折扣碼存成下列格式
      const coupon = {
        code: vm.coupon_code,
      };
      vm.$http
        .post(api, {
          data: coupon,
        })
        .then((response) => {
          // 如果有優惠券就套用並重新取得資料，失敗就跳錯誤訊息
          if (response.data.success) {
            // 重新取得購物車資料
            vm.getCart();
          } else {
            const { message } = response.data;
            const status = 'danger';
            vm.$store.dispatch('updateMessage', { message, status });
          }
        });
      vm.$store.dispatch('updateLoading', false);
    },
    // 建立訂單
    createOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      vm.$store.dispatch('updateLoading', true);
      const isValid = vm.$refs.observer.validate();
      const order = vm.form;
      if (!isValid) {
        vm.$store.dispatch('updateLoading', false);
      } else {
        vm.$http
          .post(api, {
            data: order,
          })
          .then((response) => {
            if (response.data.success) {
              vm.$router.push(`/pay/${response.data.orderId}`);
            } else {
              const { message } = response.data;
              const status = 'danger';
              vm.$store.dispatch('updateMessage', { message, status });
            }
          });
        vm.$store.dispatch('updateLoading', false);
      }
    },
  },
  created() {
    this.getCart();
  },
  computed: {
    ...mapGetters('cartModules', ['status', 'cartItem']),
  },
};
</script>
