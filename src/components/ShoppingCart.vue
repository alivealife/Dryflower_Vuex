<template>
  <div>
    <Alert></Alert>
    <!-- 右下角購物車 -->
    <div class="cart-dropdown">
      <form>
        <button class="btn btn-cart cart-color" type="button" @click.prevent="getCart(1)">
          <i class="fas fa-shopping-cart fa-lg cart-icon">
            <span class="bg-danger text-white cart-qty">{{cartQuantity}}</span>
          </i>
        </button>
        <div class="cart-menu mb-3 p-2 bg-white">
          <table class="table">
            <thead>
              <tr>
                <th colspan="4" class="border-top-0">已選購商品</th>
              </tr>
            </thead>
            <tbody>
              <!-- item.id 具唯一性，所以 key 使用 item.id -->
              <tr v-if="cartItem.carts ==''">
                <td colspan="4" class="text-danger text-center h3 py-3">
                  購物車是空的喔 :(
                  <router-link
                    class="nav-link btn btn-outline-danger mt-2"
                    href="#"
                    to="/productlist"
                  >點我選購→</router-link>
                </td>
              </tr>
              <tr v-for="(item) in cartItem.carts" :key="item.id" v-else>
                <td width="30px">
                  <!-- 移除購物車商品(要帶入商品 ID) -->
                  <button class="btn btn-outline-danger" @click.prevent="removeCartItem(item.id)">
                    <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadingItem"></i>
                    <i class="far fa-trash-alt" v-else></i>
                  </button>
                </td>
                <td>
                  <img
                    :src="item.product.imageUrl"
                    style="height: 40px; width: 38px"
                    class="img-thumbnail d-none d-md-inline-block"
                  />
                  {{ item.product.title }}
                </td>
                <td width="80">{{ item.qty }} / {{ item.product.unit }}</td>
                <td class="text-right">{{ item.total | currency }}</td>
              </tr>
              <tr>
                <td colspan="3" class="text-right">總計</td>
                <td colspan="1" class="text-right">{{ cartItem.total | currency }}</td>
              </tr>
              <!-- 有折扣才會顯示折扣價 -->
              <tr v-if="cartItem.final_total !== cartItem.total">
                <td colspan="3" class="text-right text-success">折扣價</td>
                <td
                  colspan="1"
                  class="text-right text-success"
                >{{ cartItem.final_total | currency }}</td>
              </tr>
            </tbody>
          </table>
          <button
            class="btn btn-outline-main btn-lg btn-block rounded-pill"
            :disabled="cartItem.carts ==''"
            @click.prevent="checkout"
          >結帳去</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Alert from './AlerMessage.vue';

export default {
  name: 'ShoppinCart',
  components: {
    Alert,
  },
  methods: {
    ...mapActions('cartModules', ['toggleCart']),
    // 取得購物車內容
    getCart(open) {
      this.$store.dispatch('cartModules/getCart', open);
    },
    // 刪除購物車內容
    removeCartItem(id) {
      this.$store.dispatch('cartModules/removeCartItem', id);
    },
    checkout() {
      const vm = this;
      if (vm.cartItem.carts === '') {
        vm.$bus.$emit('message:push', '購物車是空的', 'danger');
      } else {
        vm.$router.push('/checkout');
      }
    },
  },
  computed: {
    ...mapGetters('cartModules', ['cartQuantity', 'cartItem', 'status']),
  },
  created() {
    this.getCart();
  },
  mounted() {
    this.toggleCart();
  },
};
</script>
