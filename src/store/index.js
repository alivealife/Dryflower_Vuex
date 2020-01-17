import Vue from 'vue';
import Vuex from 'vuex';

import productsModules from './products';
import cartModules from './cart';
import favoriteModules from './favorite';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    messages: [],
  },
  actions: {
    updateLoading(context, payload) {
      context.commit('LOADING', payload);
    },
    // 送出訊息至 message 時也會觸發把自己移除的函式
    updateMessage(context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000);
      context.commit('MESSAGES', { message, status, timestamp });
      context.dispatch('removeMessageWithTiming', timestamp);
    },
    // 用來按下叉叉後關閉訊息
    removeMessage(context, num) {
      context.commit('REMOVEMESSAGES', num);
    },
    // 五秒一到就移除自己
    // 只有外部傳入的訊息會自動移除，手動寫死的不會
    removeMessageWithTiming(context, timestamp) {
      setTimeout(() => {
        context.state.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            context.commit('REMOVEMESSAGES', i);
          }
        });
      }, 5000);
    },
  },
  mutations: {
    LOADING(state, payload) {
      state.isLoading = payload;
    },
    MESSAGES(state, payload) {
      state.messages.push(payload);
    },
    REMOVEMESSAGES(state, payload) {
      state.messages.splice(payload, 1);
    },
  },
  getters: {
    messages: state => state.messages,
  },
  modules: {
    productsModules,
    cartModules,
    favoriteModules,
  },
});
