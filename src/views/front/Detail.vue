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
                <i class="fas fa-shopping-cart fa-fw mr-1" v-else></i> 加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row my-3">
        <div class="col-md-6 text-main">
          <h3>
            <i class="fas fa-location-arrow"></i> 商品資訊
          </h3>
          <div>
            <ul>
              <li>使用場合：{{flowerCheck[0].detail}}</li>
              <li>商品尺寸：{{flowerCheck[0].size}} cm</li>
              <li>商品材料：{{flowerCheck[0].material}}</li>
              <li>商品包裝：{{flowerCheck[0].pack}}</li>
              <li>保存方式：{{flowerCheck[0].maintenance}}</li>
            </ul>
          </div>
        </div>
        <div class="col-md-6 text-main">
          <h3>
            <i class="fas fa-exclamation-circle"></i> 注意事項
          </h3>
          <ul>
            <li>所有商品皆為手工製作。</li>
            <li>商品從下訂至製作完成約 3~7 日。</li>
            <li>因商品性質，運送時可能會發生損傷，請確認理解後再下單。</li>
            <li>如無法接受商品損傷，也可下訂後店取。</li>
            <li>所有商品皆可客製，請於結帳時留言客製內容，將會有專人與您聯繫。</li>
          </ul>
        </div>
      </div>
      <div class="row">
        <h3 class="text-main">也許您也喜歡</h3>
        <div class="row mt-4 w-100">
          <div class="col-md-4 mb-4 card-position" v-for="item in randomProducts" :key="item.id">
            <div class="card border-0 shadow-sm" @click.prevent="getProductID(item.id)">
              <a href="#">
                <div
                  style="height: 300px; background-size: cover; background-position: center;"
                  :style="{backgroundImage: `url(${item.imageUrl})`}"
                ></div>
              </a>
              <div class="card-body">
                <span class="badge badge-sub float-right ml-2 text-white">{{ item.category }}</span>
                <h5 class="card-title">
                  <a href="#" class="text-main">{{ item.title }}</a>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <ShoppingCart></ShoppingCart>
    <FavoriteList></FavoriteList>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NavBar from '../../components/NavBar.vue';
import Footer from '../../components/Footer.vue';
import ShoppingCart from '../../components/ShoppingCart.vue';
import FavoriteList from '../../components/FavoriteList.vue';
import flowerData from '../../assets/data.json';

export default {
  data() {
    return {
      productId: '',
      flowerData,
    };
  },
  components: {
    NavBar,
    Footer,
    ShoppingCart,
    FavoriteList,
  },
  methods: {
    ...mapActions('productsModules', ['getProducts']),
    getProduct(id) {
      this.$store.dispatch('productsModules/getProduct', id);
    },
    getProductID(id) {
      const vm = this;
      vm.$router.push(`/detail/${id}`);
      // 重新抓一次資料來更新頁面
      vm.getProduct(id);
      vm.getProducts();
      // 更新 productId
      vm.productId = vm.$route.params.productId;
    },
    // 加入購物車   讓 qty = 1，如果函式傳進來沒有帶入 qty 會預設 1
    addtoCart(id, qty = 1) {
      this.$store.dispatch('cartModules/addtoCart', { id, qty });
    },
    // 加入最愛
    addLove(item) {
      this.$store.dispatch('favoriteModules/addLove', item);
    },
    // 更改愛心標誌判斷
    changeLove(item) {
      const vm = this;
      return vm.favorite.some(el => item.id === el.id);
    },
    // 移除最愛
    removeLove(favoriteItem) {
      this.$store.dispatch('favoriteModules/removeLove', favoriteItem);
    },
  },
  computed: {
    ...mapGetters('productsModules', ['products', 'product', 'randomProducts']),
    ...mapGetters('cartModules', ['status']),
    ...mapGetters('favoriteModules', ['favorite']),
    // 抓取目前商品的資料
    flowerCheck() {
      const vm = this;
      // console.log(this.flowerData.flowerData[0]);
      return vm.flowerData.flowerData.filter(item => item.id === vm.productId);
    },
  },
  created() {
    // 取得產品 ID
    // orderId 對應的是 index.js 設定的路由，要相同才能抓到
    this.productId = this.$route.params.productId;
    this.getProduct(this.productId);
    this.getProducts();
  },
};
</script>
