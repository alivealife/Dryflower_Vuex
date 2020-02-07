<template>
  <div>
    <header>
      <NavBar />
    </header>
    <div class="container">
      <div class="banner" :style="{backgroundImage: 'url(' + bg + ')' }">
        <!-- <img
          src="../../assets/images/artsy-vibes-WieARwnazLc-unsplash.jpg"
          alt
          class="img-fluid"
        /> -->
        <h5 class="text-white banner-text font-weight-bolder">總能找到最適合您的</h5>
      </div>
      <div class="row mt-3">
        <div class="col-md-3 text-center pt-4">
          <div class="input-group mb-4 border rounded-pill p-1">
            <input
              type="search"
              placeholder="搜尋..."
              aria-describedby="button-addon3"
              class="form-control bg-none border-0 focus-none"
              v-model="filterText"
            />
            <div class="input-group-append border-0">
              <button id="button-addon3" type="button" class="btn btn-link text-main">
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
          <div class="list-group" id="list-tab" role="tablist">
            <a
              class="list-group-item list-group-item-action active"
              id="list-all-list"
              data-toggle="list"
              href="#list-all"
              role="tab"
              aria-controls="all"
            >所有商品</a>
            <a
              class="list-group-item list-group-item-action"
              id="list-flower-list"
              data-toggle="list"
              href="#list-flower"
              role="tab"
              aria-controls="flower"
              @click="getSort('花')"
            >花</a>
            <a
              class="list-group-item list-group-item-action"
              id="list-bouquet-list"
              data-toggle="list"
              href="#list-bouquet"
              role="tab"
              aria-controls="bouquet"
              @click="getSort('花束')"
            >花束</a>
            <a
              class="list-group-item list-group-item-action"
              id="list-flowerpot-list"
              data-toggle="list"
              href="#list-flowerpot"
              role="tab"
              aria-controls="flowerpot"
              @click="getSort('花盆')"
            >花盆</a>
            <a
              class="list-group-item list-group-item-action"
              id="list-cactus-list"
              data-toggle="list"
              href="#list-cactus"
              role="tab"
              aria-controls="cactus"
              @click="getSort('盆栽')"
            >盆栽</a>
          </div>
        </div>
        <div class="col-md-9">
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="list-all"
              role="tabpanel"
              aria-labelledby="list-all-list"
            >
              <div class="row mt-4">
                <div
                  class="col-md-4 mb-4 card-position"
                  v-for="item in filterArrayALL"
                  :key="item.id"
                >
                  <div class="card border-0 shadow-sm" @click.prevent="getProductID(item.id)">
                    <a href="#">
                      <div
                        style="height: 300px; background-size: cover; background-position: center;"
                        :style="{backgroundImage: `url(${item.imageUrl})`}"
                      ></div>
                    </a>
                    <div class="card-body">
                      <span class="badge badge-sub float-right ml-2 text-white">
                        {{ item.category }}</span>
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
                        <del
                          class="h6 text-secondary"
                          v-if="item.price"
                        >原價 {{ item.origin_price }} 元</del>
                        <div class="h5 text-sub" v-if="item.price"> {{ item.price }} 元</div>
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
                    <a
                      href="#"
                      class="btn text-danger"
                      @click.prevent="removeLove(item)"
                      v-if="changeLove(item)"
                    >
                      <i class="fas fa-heart fa-lg"></i>
                    </a>
                    <a href="#" class="btn text-danger" @click.prevent="addLove(item)" v-else>
                      <i class="far fa-heart fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="list-flower"
              role="tabpanel"
              aria-labelledby="list-flower-list"
            >
              <div class="row mt-4">
                <div
                  class="col-md-4 mb-4 card-position"
                  v-for="item in filterArraySort"
                  :key="item.id"
                >
                  <div class="card border-0 shadow-sm" @click.prevent="getProductID(item.id)">
                    <a href="#">
                      <div
                        style="height: 300px; background-size: cover; background-position: center;"
                        :style="{backgroundImage: `url(${item.imageUrl})`}"
                      ></div>
                    </a>
                    <div class="card-body">
                      <span class="badge badge-sub float-right ml-2 text-white">
                        {{ item.category }}</span>
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
                        <del
                          class="h6 text-secondary"
                          v-if="item.price"
                        >原價 {{ item.origin_price }} 元</del>
                        <div class="h5 text-sub" v-if="item.price">現在只要 {{ item.price }} 元</div>
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
                    <a
                      href="#"
                      class="btn text-danger"
                      @click.prevent="removeLove(item)"
                      v-if="changeLove(item)"
                    >
                      <i class="fas fa-heart fa-lg"></i>
                    </a>
                    <a href="#" class="btn text-danger" @click.prevent="addLove(item)" v-else>
                      <i class="far fa-heart fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="list-bouquet"
              role="tabpanel"
              aria-labelledby="list-bouquet-list"
            >
              <div class="row mt-4">
                <div
                  class="col-md-4 mb-4 card-position"
                  v-for="item in filterArraySort"
                  :key="item.id"
                >
                  <div class="card border-0 shadow-sm" @click.prevent="getProductID(item.id)">
                    <a href="#">
                      <div
                        style="height: 300px; background-size: cover; background-position: center;"
                        :style="{backgroundImage: `url(${item.imageUrl})`}"
                      ></div>
                    </a>
                    <div class="card-body">
                      <span class="badge badge-sub float-right ml-2 text-white">
                        {{ item.category }}</span>
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
                        <del
                          class="h6 text-secondary"
                          v-if="item.price"
                        >原價 {{ item.origin_price }} 元</del>
                        <div class="h5 text-sub" v-if="item.price">現在只要 {{ item.price }} 元</div>
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
                    <a
                      href="#"
                      class="btn text-danger"
                      @click.prevent="removeLove(item)"
                      v-if="changeLove(item)"
                    >
                      <i class="fas fa-heart fa-lg"></i>
                    </a>
                    <a href="#" class="btn text-danger" @click.prevent="addLove(item)" v-else>
                      <i class="far fa-heart fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="list-flowerpot"
              role="tabpanel"
              aria-labelledby="list-flowerpot-list"
            >
              <div class="row mt-4">
                <div
                  class="col-md-4 mb-4 card-position"
                  v-for="item in filterArraySort"
                  :key="item.id"
                >
                  <div class="card border-0 shadow-sm" @click.prevent="getProductID(item.id)">
                    <a href="#">
                      <div
                        style="height: 300px; background-size: cover; background-position: center;"
                        :style="{backgroundImage: `url(${item.imageUrl})`}"
                      ></div>
                    </a>
                    <div class="card-body">
                      <span class="badge badge-sub float-right ml-2 text-white">
                        {{ item.category }}</span>
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
                        <del
                          class="h6 text-secondary"
                          v-if="item.price"
                        >原價 {{ item.origin_price }} 元</del>
                        <div class="h5 text-sub" v-if="item.price">現在只要 {{ item.price }} 元</div>
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
                    <a
                      href="#"
                      class="btn text-danger"
                      @click.prevent="removeLove(item)"
                      v-if="changeLove(item)"
                    >
                      <i class="fas fa-heart fa-lg"></i>
                    </a>
                    <a href="#" class="btn text-danger" @click.prevent="addLove(item)" v-else>
                      <i class="far fa-heart fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="list-cactus"
              role="tabpanel"
              aria-labelledby="list-cactus-list"
            >
              <div class="row mt-4">
                <div
                  class="col-md-4 mb-4 card-position"
                  v-for="item in filterArraySort"
                  :key="item.id"
                >
                  <div class="card border-0 shadow-sm" @click.prevent="getProductID(item.id)">
                    <a href="#">
                      <div
                        style="height: 300px; background-size: cover; background-position: center;"
                        :style="{backgroundImage: `url(${item.imageUrl})`}"
                      ></div>
                    </a>
                    <div class="card-body">
                      <span class="badge badge-sub float-right ml-2 text-white">
                        {{ item.category }}</span>
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
                        <del
                          class="h6 text-secondary"
                          v-if="item.price"
                        >原價 {{ item.origin_price }} 元</del>
                        <div class="h5 text-sub" v-if="item.price">現在只要 {{ item.price }} 元</div>
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
                    <a
                      href="#"
                      class="btn text-danger"
                      @click.prevent="removeLove(item)"
                      v-if="changeLove(item)"
                    >
                      <i class="fas fa-heart fa-lg"></i>
                    </a>
                    <a href="#" class="btn text-danger" @click.prevent="addLove(item)" v-else>
                      <i class="far fa-heart fa-lg"></i>
                    </a>
                  </div>
                </div>
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
import BG from '../../assets/images/artsy-vibes-WieARwnazLc-unsplash.jpg';

export default {
  name: 'Productlist',
  components: {
    NavBar,
    Footer,
    ShoppingCart,
    FavoriteList,
  },
  data() {
    return {
      filterText: '',
      bg: BG,
    };
  },
  methods: {
    ...mapActions('productsModules', ['getProducts']),
    // 點擊產品後引導到個別產品頁
    getProductID(id) {
      const vm = this;
      vm.$router.push(`/detail/${id}`);
    },
    getSort(tag) {
      this.$store.dispatch('productsModules/getSort', tag);
    },
    // 加入購物車
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
    // 搜尋全部
    filterArrayALL() {
      const vm = this;
      return vm.products.filter(item => item.title.match(vm.filterText));
    },
    // 搜尋單一分頁
    filterArraySort() {
      const vm = this;
      return vm.sortProduct.filter(item => item.title.match(vm.filterText));
    },
    ...mapGetters('productsModules', [
      'products',
      'randomProducts',
      'sortProduct',
    ]),
    ...mapGetters('cartModules', ['status']),
    ...mapGetters('favoriteModules', ['favorite']),
  },
  created() {
    this.getProducts();
  },
};
</script>
