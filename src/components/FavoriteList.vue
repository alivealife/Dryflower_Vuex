<template>
  <div>
    <Alert></Alert>
    <!-- 右下角最愛列表 -->
    <div class="favorite-dropdown">
      <form>
        <button
          class="btn btn-favorite favorite-color"
          type="button"
          @click.prevent="openFavoriteList(1)"
        >
          <i class="fas fa-heart fa-lg favorite-icon">
            <span class="bg-danger text-white favorite-qty">{{ favoriteQty }}</span>
          </i>
          <br />
        </button>
        <div class="favorite-menu mb-3 p-2 bg-white">
          <table class="table mb-0">
            <thead>
              <tr>
                <th colspan="4" class="border-top-0">我的最愛商品</th>
              </tr>
            </thead>
            <tbody>
              <!-- item.id 具唯一性，所以 key 使用 item.id -->
              <tr v-if="favorite ==''">
                <td colspan="4" class="text-danger text-center h3 py-3">
                  這裡沒有東西
                  <router-link class="nav-link btn btn-outline-danger mt-2"
                  href="#" to="/productlist">
                  點我選購→</router-link>
                </td>
              </tr>
              <tr v-for="(item) in favorite" :key="item.id">
                <td colspan="1" class="px-0">
                  <button type="button" class="btn text-danger" @click.prevent="removeLove(item)">
                    <i class="fas fa-heart fa-2x"></i>
                  </button>
                </td>
                <td>
                  <img
                    :src="item.imageUrl"
                    style="height: 45px; width: 45px"
                    class="img-thumbnail d-none d-md-inline-block"
                  />
                  {{ item.title }}
                </td>
                <td colspan="1" class="text-right align-middle">{{ item.price | currency }}</td>
                <td colspan="1" class="text-right align-middle">
                  <button
                    type="button"
                    class="btn btn-outline-third ml-auto"
                    @click="addtoCart(item.id)"
                  >
                    <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadingItem"></i>
                    <i class="fas fa-shopping-cart" v-else></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Alert from './AlerMessage.vue';

export default {
  name: 'FavoriteList',
  components: {
    Alert,
  },
  methods: {
    ...mapActions('favoriteModules', ['getfavorite', 'toggleFavorite']),
    // 開啟最愛列表
    openFavoriteList(open) {
      this.$store.dispatch('favoriteModules/openFavoriteList', open);
    },
    // 從最愛清單加入購物車
    addtoCart(id, qty = 1) {
      this.$store.dispatch('cartModules/addtoCart', { id, qty });
    },
    // 移除最愛
    removeLove(favoriteItem) {
      this.$store.dispatch('favoriteModules/removeLove', favoriteItem);
    },
  },
  computed: {
    ...mapGetters('favoriteModules', ['favorite', 'sliceIndex', 'favoriteQty']),
    ...mapGetters('cartModules', ['status']),
  },
  created() {
    this.getfavorite();
  },
  mounted() {
    this.toggleFavorite();
  },
};
</script>
