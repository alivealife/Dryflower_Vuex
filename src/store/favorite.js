import $ from 'jquery';

export default {
  namespaced: true,
  state: {
    // 儲存我的最愛資料
    favorite: [],
    sliceIndex: '',
  },
  actions: {
    // 取得最愛列表
    getfavorite(context) {
      context.commit('FAVORITE', JSON.parse(localStorage.getItem('savefavorite')) || []);
    },
    // 加入最愛
    addLove(context, item) {
      if (!context.state.favorite.includes(item)) {
        context.commit('ADDFAVORITE', item);
        context.commit('SAVEFAVORITE');
      }
    },
    // 移除最愛
    removeLove(context, favoriteItem) {
      context.commit('SLICEINDEX', favoriteItem);
      // 因為刪除過快會導致點下刪除最愛就觸發 toggle 功能關閉 dropdown
      // 所以在這裡設一個延遲時間避免這個問題
      setTimeout(() => context.commit('DELETEFAVORITE'), 10);
      // vm.stared 存進 localStorage
      setTimeout(
        () => context.commit('SAVEFAVORITE'),
        10,
      );
    },
    // 開啟最愛列表
    openFavoriteList(context, open) {
      if (open === 1) {
        $('.favorite-dropdown').toggleClass('show');
      }
    },
    // 點擊最愛列表以外的地方就關閉選單
    toggleFavorite() {
      $(document).on('click', (e) => {
        // 如果點擊到的地方的父元素沒有 .cart-dropdown 而且 .cart-dropdown 有 .show 時
        // 就把 .cart-dropdown 的 .show 移除
        if (
          !e.target.closest('.favorite-dropdown')
          && $('.favorite-dropdown').hasClass('show')
        ) {
          $('.favorite-dropdown').removeClass('show');
        }
      });
    },
  },
  mutations: {
    FAVORITE(state, payload) {
      state.favorite = payload;
    },
    ADDFAVORITE(state, payload) {
      state.favorite.push(payload);
    },
    SAVEFAVORITE(state) {
      localStorage.setItem('savefavorite', JSON.stringify(state.favorite));
    },
    SLICEINDEX(state, favoriteItem) {
      // 重新定位要刪除的 index
      state.favorite.forEach((item, key) => {
        if (favoriteItem.id === item.id) {
          state.sliceIndex = key;
        }
      });
    },
    DELETEFAVORITE(state) {
      state.favorite.splice(state.sliceIndex, 1);
    },
    FILTERARRAYALL(state) {
      // 第二個 return 後面的條件如果成立 (item.name 等於 vm.filterText)
      // 那就會回傳 arrayData 裡面 "單個物件" 給第一個 return 讓它回傳給 filterArray
      return state.products.filter(item => item.title.match(state.filterText));
    },
    FILTERARRAYSORT(state) {
      // 第二個 return 後面的條件如果成立 (item.name 等於 vm.filterText)
      // 那就會回傳 arrayData 裡面 "單個物件" 給第一個 return 讓它回傳給 filterArray
      return state.sortProduct.filter(item => item.title.match(state.filterText));
    },
  },
  getters: {
    favorite: state => state.favorite,
    sliceIndex: state => state.sliceIndex,
    favoriteQty: (state) => {
      if (!state.favorite) {
        return 0;
      }
      return state.favorite.length;
    },
  },
};
