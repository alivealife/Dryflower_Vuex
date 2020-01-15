import axios from 'axios';
import $ from 'jquery';

export default {
  namespaced: true,
  state: {
    // 儲存購物車資料
    cartItem: [],
    // 加入購物車符號切換
    status: {
      loadingItem: '',
    },
  },
  actions: {
    // 取得購物車內容
    getCart(context, open) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      if (open === 1) {
        $('.cart-dropdown').toggleClass('show');
      }
      axios.get(api).then((response) => {
        context.commit('CARTITEM', response.data.data);
      });
    },
    // 加入購物車
    addtoCart(context, { id, qty }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true, { root: true });
      // 將點擊商品 ID 存入 loadingItem
      context.commit('LOADINGITEM', id);
      const cart = {
        product_id: id,
        // 只寫 qty 的話會把數量直接帶進來
        qty,
      };
      // 注意資料結構是{data: 購物車內容}
      axios
        .post(api, {
          data: cart,
        })
        .then(() => {
          // Modal 打開之後將 loadingItem 變回空值
          context.commit('LOADINGITEM', '');
          // 加入購物車後取回購物車的內容
          context.commit('LOADING', false, { root: true });
          context.dispatch('getCart');
        });
    },
    // 刪除購物車內容
    removeCartItem(context, id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      context.commit('LOADINGITEM', id);
      context.commit('LOADING', true, { root: true });
      axios.delete(api).then(() => {
        context.commit('LOADINGITEM', '');
        context.commit('LOADING', false, { root: true });
        // 刪除後重新取得列表
        context.dispatch('getCart');
      });
    },
    // 點擊 dropmenu 以外的地方就關閉選單
    toggleCart() {
      $(document).on('click', (e) => {
        // 如果點擊到的地方的父元素沒有 .cart-dropdown 而且 .cart-dropdown 有 .show 時
        // 就把 .cart-dropdown 的 .show 移除
        if (
          !e.target.closest('.cart-dropdown')
              && $('.cart-dropdown').hasClass('show')
        ) {
          $('.cart-dropdown').removeClass('show');
        }
      });
    },
  },
  mutations: {
    CARTITEM(state, payload) {
      state.cartItem = payload;
    },
    LOADINGITEM(state, payload) {
      state.status.loadingItem = payload;
    },
  },
  getters: {
    status: state => state.status,
    cartItem: state => state.cartItem,
  },
};
