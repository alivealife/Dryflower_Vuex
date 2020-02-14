import axios from 'axios';

export default {
  namespaced: true,
  state: {
    // 儲存所有產品
    products: [],
    randomProducts: [],
    sortProduct: [],
    product: {},
  },
  actions: {
    // 所有商品列表
    getProducts(context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      // vm.isLoading = true;
      context.commit('LOADING', true, { root: true });
      axios.get(api).then((response) => {
        // 如果 products 裡面沒資料才撈資料
        if (context.state.products.length === 0) {
          context.commit('PRODUCTS', response.data.products);
        }
        context.commit('RAMDOMPRODUCTS');
        context.commit('LOADING', false, { root: true });
      });
    },
    getProduct(context, id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      context.commit('LOADING', true, { root: true });
      axios.get(api).then((response) => {
        context.commit('PRODUCT', response.data.product);
        // 讓下拉式選單預設為 1
        context.commit('PRODUCTNUM', 1);
        context.commit('LOADING', false, { root: true });
      });
    },
    // 切換分頁用
    getSort(context, tag) {
      context.commit('SORTPRODUCT', tag);
    },
  },
  mutations: {
    PRODUCTS(state, payload) {
      payload.forEach((item) => {
        if (item.is_enabled === 1) {
          state.products.push(item);
        }
      });
    },
    PRODUCT(state, payload) {
      state.product = payload;
    },
    PRODUCTNUM(state, payload) {
      state.product.num = payload;
    },
    RAMDOMPRODUCTS(state) {
      const shuffled = state.products.slice(0);
      let i = Number(state.products.length);
      const min = i - 3;
      let temp;
      let index;
      while (i > min) {
        i -= 1;
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      state.randomProducts = shuffled.slice(min);
    },
    SORTPRODUCT(state, payload) {
      state.sortProduct = state.products.filter((item) => {
        if (item.category === payload) {
          return true;
        }
        return false;
      });
    },
  },
  getters: {
    products: state => state.products,
    randomProducts: state => state.randomProducts,
    sortProduct: state => state.sortProduct,
    product: state => state.product,
  },
};
