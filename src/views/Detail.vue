<template>
  <div>
    <header>
      <NavBar />
    </header>
    <div class="container py-3">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="row">
            <div class="col-md-6 text-center">
              <img :src="product.imageUrl" class="img-detail img-thumbnail" alt />
            </div>
            <div class="col-md-6">
              <div class="d-flex align-items-center">
                <h2 class="text-main mb-0">{{ product.title }}</h2>
                <a
                  href="#"
                  class="btn text-danger"
                  @click.prevent="removeLove(product)"
                  v-if="changeLove(product)"
                >
                  <i class="fas fa-heart fa-2x"></i>
                </a>
                <a href="#" class="btn text-danger" @click.prevent="addLove(product)" v-else>
                  <i class="far fa-heart fa-2x"></i>
                </a>
              </div>
              <blockquote class="blockquote mt-3">
                <p class="mb-0">{{ product.content }}</p>
                <footer class="blockquote-footer text-right">{{ product.description }}</footer>
              </blockquote>
              <div class="d-flex justify-content-between align-items-baseline">
                <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
                <del class="h6 text-secondary" v-if="product.price">
                  原價 {{ product.origin_price }} 元</del>
                <div class="h4 text-sub" v-if="product.price">現在只要 {{ product.price }} 元</div>
              </div>
              <select name class="form-control mt-3" v-model="product.num">
                <option :value="num" v-for="num in 10" :key="num">
                  選購 {{num}} {{product.unit}}</option>
              </select>
              <button
                type="button"
                class="btn btn-outline-third mt-3 d-flex ml-auto align-items-center"
                @click="addtoCart(product.id, product.num)"
              >
                <i class="fas fa-spinner fa-spin fa-fw"
                v-if="product.id === status.loadingItem"></i>
                <i class="fas fa-shopping-cart fa-fw" v-else></i> 加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <ShoppingCart
      :cart-data="cartItem"
      :loading-img="status"
      @opencart="getCart(1)"
      @removecart="removeCartItem"
    ></ShoppingCart>
    <FavoriteList
      :favorite-data="favorite"
      :loading-img="status"
      @openfavorite="openFavoriteList(1)"
      @removefavorite="removeLove"
      @favoriteToCart="addtoCart"
    ></FavoriteList>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import ShoppingCart from '../components/ShoppingCart.vue';
import FavoriteList from '../components/FavoriteList.vue';

export default {
  data() {
    return {
      productId: '',
    };
  },
  components: {
    NavBar,
    Footer,
    ShoppingCart,
    FavoriteList,
  },
  methods: {
    ...mapActions('cartModules', ['toggleCart']),
    ...mapActions('favoriteModules', ['getfavorite', 'toggleFavorite']),
    getProduct(id) {
      this.$store.dispatch('productsModules/getProduct', id);
    },
    // 加入購物車   讓 qty = 1，如果函式傳進來沒有帶入 qty 會預設 1
    addtoCart(id, qty = 1) {
      this.$store.dispatch('cartModules/addtoCart', { id, qty });
    },
    // 取得購物車內容
    getCart(open) {
      this.$store.dispatch('cartModules/getCart', open);
    },
    // 刪除購物車內容
    removeCartItem(id) {
      this.$store.dispatch('cartModules/removeCartItem', id);
    },
    // 加入最愛
    addLove(item) {
      this.$store.dispatch('favoriteModules/addLove', item);
    },
    // 更改愛心標誌判斷
    changeLove(item) {
      const vm = this;
      return vm.favorite.some((el) => {
        const result = item.id === el.id;
        return result;
      });
    },
    // 移除最愛
    removeLove(favoriteItem) {
      this.$store.dispatch('favoriteModules/removeLove', favoriteItem);
    },
    // 開啟最愛列表
    openFavoriteList(open) {
      this.$store.dispatch('favoriteModules/openFavoriteList', open);
    },
  },
  computed: {
    ...mapGetters('productsModules', ['product']),
    ...mapGetters('cartModules', ['status', 'cartItem']),
    ...mapGetters('favoriteModules', ['favorite', 'sliceIndex']),
  },
  created() {
    // 取得產品 ID
    // orderId 對應的是 index.js 設定的路由，要相同才能抓到
    this.productId = this.$route.params.productId;
    this.getProduct(this.productId);
    this.getCart();
    this.getfavorite();
  },
  mounted() {
    // 點擊任意處關閉購物車視窗
    this.toggleCart();
    this.toggleFavorite();
  },
};
</script>
