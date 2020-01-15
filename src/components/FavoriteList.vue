<template>
  <div>
    <Alert></Alert>
    <!-- 右下角最愛列表 -->
    <div class="favorite-dropdown">
      <form>
        <button class="btn btn-secondary btn-favorite" type="button" @click.prevent="openfavorite">
          <i class="fas fa-heart fa-lg favorite-icon">
            <span class="bg-danger text-white favorite-qty">{{ favoriteQty }}</span>
          </i>
          <br />最愛
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
              <tr v-if="favoriteData ==''">
                <td colspan="4" class="text-danger text-center h3 py-3">這裡沒有東西</td>
              </tr>
              <tr v-for="(item) in favoriteData" :key="item.id">
                <td colspan="1" class="px-0">
                  <button
                    type="button"
                    class="btn text-danger"
                    @click.prevent="removefavorite(item)"
                  >
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
                    <i class="fas fa-spinner fa-spin" v-if="item.id === loadingImg.loadingItem"></i>
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
import Alert from './AlerMessage.vue';

export default {
  name: 'FavoriteList',
  components: {
    Alert,
  },
  props: {
    favoriteData: {},
    loadingImg: {},
  },
  methods: {
    openfavorite() {
      this.$emit('openfavorite');
    },
    // 將要移除的 ID 丟回給父元件
    removefavorite(item) {
      this.$emit('removefavorite', item);
    },
    // 從最愛清單加入購物車
    addtoCart(id) {
      this.$emit('favoriteToCart', id);
    },
  },
  computed: {
    // 避免一開始資料沒讀進來會出錯，所以當有資料時才計算
    favoriteQty() {
      if (this.favoriteData) {
        return this.favoriteData.length;
      }
      return 0;
    },
  },
};
</script>
