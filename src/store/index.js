import Vue from 'vue';
import Vuex from 'vuex';

import productsModules from './products';
import cartModules from './cart';
import favoriteModules from './favorite';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
  },
  actions: {
    updateLoading(context, payload) {
      context.commit('LOADING', payload);
    },
  },
  mutations: {
    LOADING(state, payload) {
      state.isLoading = payload;
    },
  },
  modules: {
    productsModules,
    cartModules,
    favoriteModules,
  },
});
