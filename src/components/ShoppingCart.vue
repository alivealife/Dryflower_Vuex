<template>
  <div>
    <Alert></Alert>
    <!-- 右下角購物車 -->
    <div class="cart-dropdown">
      <form>
        <button class="btn btn-secondary btn-cart" type="button" @click="openCart">
          <i class="fas fa-shopping-cart fa-lg cart-icon">
            <span class="bg-danger text-white cart-qty">{{cartQty}}</span>
          </i>
          <br />購物車
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
              <tr v-if="cartData.carts ==''">
                <td colspan="4" class="text-danger text-center h3 py-3">購物車是空的喔 :(</td>
              </tr>
              <tr v-for="(item) in cartData.carts" :key="item.id" v-else>
                <td width="30px">
                  <!-- 移除購物車商品(要帶入商品 ID) -->
                  <button class="btn btn-outline-danger" @click.prevent="removeCart(item.id)">
                    <i class="fas fa-spinner fa-spin" v-if="item.id === loadingImg.loadingItem"></i>
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
                <td colspan="1" class="text-right">{{ cartData.total | currency }}</td>
              </tr>
              <!-- 有折扣才會顯示折扣價 -->
              <tr v-if="cartData.final_total !== cartData.total">
                <td colspan="3" class="text-right text-success">折扣價</td>
                <td
                  colspan="1"
                  class="text-right text-success"
                >{{ cartData.final_total | currency }}</td>
              </tr>
            </tbody>
          </table>
          <button
            class="btn btn-outline-main btn-lg btn-block rounded-pill"
            @click.prevent="checkout"
          >結帳去</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Alert from './AlerMessage.vue';

export default {
  name: 'ShoppinCart',
  components: {
    Alert,
  },
  props: {
    cartData: {},
    loadingImg: {},
  },
  methods: {
    openCart() {
      this.$emit('opencart');
    },
    // 將要移除的 ID 丟回給父元件
    removeCart(id) {
      this.$emit('removecart', id);
    },
    checkout() {
      const vm = this;
      if (vm.cartData.carts === '') {
        vm.$bus.$emit('message:push', '購物車是空的', 'danger');
      } else {
        vm.$router.push('/checkout');
      }
    },
  },
  computed: {
    // 避免一開始資料沒讀進來會出錯，所以當有資料時才計算
    cartQty() {
      if (this.cartData.carts) {
        return this.cartData.carts.length;
      }
      return 0;
    },
  },
};
</script>
