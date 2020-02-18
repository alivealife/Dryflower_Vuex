<template>
  <div>
    <header>
      <NavBar />
    </header>
    <div class="container">
      <!-- 幻燈片 -->
      <div
        class="text-main text-bold w-100 mb-1 text-truncate font-weight-bolder"
        @mouseover="stop"
        @mouseout="lang"
      >{{scrollMsg}}</div>
      <div
        id="carouselExampleFade"
        class="carousel slide carousel-fade carousel-zindex"
        data-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="../../assets/images/camila-cordeiro-736F6KL7l4U-unsplash.jpg"
              class="d-block w-100"
            />
            <div class="carousel-caption font-weight-bolder rounded mobile-bg p-3">
              <h5 class="carousel-font-title">來自我們的真心</h5>
              <p class="carousel-font-content">讓我們依您的需求，製作出獨一無二的花束吧</p>
              <router-link
                href="#"
                to="/detail/-LsfKa_6F8mh0AlqXVfc"
                class="btn btn-outline-light rounded-pill"
              >來去逛逛</router-link>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="../../assets/images/kseniya-petukhova-qJy61YwqQB8-unsplash.jpg"
              class="d-block w-100"
            />
            <div class="carousel-caption font-weight-bold rounded mobile-bg p-3">
              <h5 class="carousel-font-title">Longer but not forever</h5>
              <p class="carousel-font-content">雖然不是永遠，但是我們能承諾很久</p>
              <router-link
                href="#"
                to="/detail/-LuGzaXjcvJg-9McQwru"
                class="btn btn-outline-light rounded-pill"
              >來去逛逛</router-link>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="../../assets/images/sharon-mccutcheon-cFufeCC4y8U-unsplash.jpg"
              class="d-block w-100"
            />
            <div class="carousel-caption font-weight-bolder rounded mobile-bg p-3">
              <h5 class="carousel-font-title">真心獻給您</h5>
              <p class="carousel-font-content">在最重要的時刻來一束玫瑰花吧</p>
              <router-link
                href="#"
                to="/detail/-Lv9yyUOZQFVyhh7puml"
                class="btn btn-outline-light rounded-pill"
              >來去逛逛</router-link>
            </div>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleFade"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleFade"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
    <section class="my-md-5 mt-3 section-bg">
      <div class="container full-width">
        <div class="row no-gutters flex-column-reverse flex-md-row">
          <div class="col-md-6 text-forText d-flex justify-content-end pr-3 mr-md-0">
            <div class="vertical-text py-3 section-line-height h6">
              <p>雖然我們不能帶給您永恆的保證，</p>
              <p>但是，</p>
              <p>我們能讓這值得紀念一刻更長久，</p>
              <p>從今天開始，</p>
              <p>讓我們改用乾燥花，</p>
              <p>紀念美好的一切。</p>
            </div>
            <h3 class="vertical-text section-title h2 mr-4">為什麼選擇乾燥花—</h3>
          </div>
          <div class="col-md-6 animatedY">
            <img
              src="../../assets/images/kiwihug-ibjW86dBHW0-unsplash.jpg"
              alt
              class="section-img w-100"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="my-md-5 mb-3 section-bg">
      <div class="container full-width">
        <div class="row no-gutters">
          <div class="col-md-6 animatedLR">
            <img
              src="../../assets/images/peter-bucks-_ga1sCEvErE-unsplash.jpg"
              alt
              class="section-img w-100"
            />
          </div>
          <div class="col-md-6 text-forText d-flex justify-content-end pr-3 mr-md-0 mr-4 animatedY">
            <div class="vertical-text py-3 section-line-height h6">
              <p>或許您會想問，</p>
              <p>為什麼要選擇你們，</p>
              <p>我們保證，</p>
              <p>所有的乾燥花都是純手工製造，</p>
              <p>世上不會有第二束一樣的商品，</p>
              <p>讓您的紀念獨一無二。</p>
            </div>
            <h3 class="vertical-text section-title h2">為什麼選擇我們—</h3>
          </div>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="hot-sale d-flex align-items-end">
        <h3 class="text-main mb-0">
          <i class="fab fa-hotjar"></i> 熱銷商品
        </h3>
        <router-link href="#" to="/productlist" class="ml-3 text-sub text-decoration-none">
        查看所有產品→</router-link>
      </div>
      <!-- 商品 -->
      <div class="row mt-4">
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
              <p class="card-text">{{ item.content }}</p>
            </div>
            <div class="card-footer d-flex bg-white border-0">
              <div class="d-flex flex-column">
                <!-- 如果只有原價就顯示上面這條 -->
                <div class="h5" v-if="!item.price">原價 {{ item.origin_price }} 元</div>
                <!-- 如果同時有原價跟售價就顯示下面兩條 -->
                <!-- 0、''、nan 都算 false -->
                <del class="h6 text-secondary" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                <div class="h5 text-sub" v-if="item.price">{{ item.price }} 元</div>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-outline-third ml-auto card-cart"
            @click="addtoCart(item.id)"
          >
            <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadingItem"></i>
            <i class="fas fa-shopping-cart" v-else></i>
          </button>
          <div class="heart-position">
            <button
              type="button"
              class="btn text-danger"
              @click.prevent="removeLove(item)"
              v-if="changeLove(item)"
            >
              <i class="fas fa-heart fa-lg"></i>
            </button>
            <button type="button" class="btn text-danger" @click.prevent="addLove(item)" v-else>
              <i class="far fa-heart fa-lg"></i>
            </button>
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
import $ from 'jquery';
import { mapGetters, mapActions } from 'vuex';
import NavBar from '../../components/NavBar.vue';
import Footer from '../../components/Footer.vue';
import ShoppingCart from '../../components/ShoppingCart.vue';
import FavoriteList from '../../components/FavoriteList.vue';

export default {
  name: 'Index',
  components: {
    NavBar,
    Footer,
    ShoppingCart,
    FavoriteList,
  },
  data() {
    return {
      scrollMsg:
        '特惠活動： 歡慶開幕，只要在 2020/11/20 前，於結帳時輸入折扣碼 costdown 就可獲得優惠價格。 最新消息：找不到您喜歡的商品嗎？請點選聯絡我們說明您的需求。 ',
      intervalId: null, // data 定義一個定時器id
    };
  },
  methods: {
    ...mapActions('productsModules', ['getProducts']),
    getProductID(id) {
      const vm = this;
      vm.$router.push(`/detail/${id}`);
    },
    // 加入購物車
    addtoCart(id, qty = 1) {
      this.$store.dispatch('cartModules/addtoCart', { id, qty });
    },
    // 跑馬燈用
    lang() {
      const vm = this;
      if (vm.intervalId != null) return;
      vm.intervalId = setInterval(() => {
        // 得到第一個字元
        const start = vm.scrollMsg.substring(0, 1);
        // 得到最後一個字元
        const end = vm.scrollMsg.substring(1);
        // 後面與前面字元連接
        vm.scrollMsg = end + start;
      }, 100);
    },
    // 停止計時器
    stop() {
      const vm = this;
      clearInterval(vm.intervalId);
      // 當我清除定時器之後，重新讓intervalId為null
      vm.intervalId = null;
    },
    // 更改愛心標誌判斷
    changeLove(item) {
      const vm = this;
      return vm.favorite.some(el => item.id === el.id);
    },
    // 加入最愛
    addLove(item) {
      this.$store.dispatch('favoriteModules/addLove', item);
    },
    // 移除最愛
    removeLove(favoriteItem) {
      this.$store.dispatch('favoriteModules/removeLove', favoriteItem);
    },
    sectionFadeIn() {
      $(window).scroll(() => {
        // 宣告變數 scrollPos = window 畫面上滾動到位置的值
        const scrollPos = $(window).scrollTop();
        // 宣告變數 windowHeight = 目前 window 的高度
        const windowHeight = $(window).height();
        $('.animatedY').each(function animatedY() {
          // 宣告變數 thisPos = animated 的位置
          const thisPos = $(this).offset().top;
          // console.log('animated', thisPos);
          if (thisPos <= scrollPos + windowHeight / 1.5) {
            // console.log('animated', thisPos);
            $(this).addClass('fadeInY');
          }
        });
        $('.animatedLR').each(function animatedLR() {
          // 宣告變數 thisPos = animated 的位置
          const thisPos = $(this).offset().top;
          if (thisPos <= scrollPos + windowHeight / 1.2) {
            $(this).addClass('fadeInLR');
          }
        });
      });
    },
  },
  computed: {
    ...mapGetters('productsModules', ['products', 'randomProducts']),
    ...mapGetters('cartModules', ['status']),
    ...mapGetters('favoriteModules', ['favorite']),
  },
  created() {
    this.getProducts();
    this.lang();
  },
  mounted() {
    this.sectionFadeIn();
  },
};
</script>
