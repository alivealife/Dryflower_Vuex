import Vue from 'vue';
import Vuex from 'vuex';

// axios
import axios from 'axios';
import VueAxios from 'vue-axios';

// 讀取套件
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

// bootstrap
import 'bootstrap';

// 載入驗證套件 VeeValidate
import {
  ValidationProvider, ValidationObserver, localize, extend,
} from 'vee-validate';
// 載入所有規則
import * as rules from 'vee-validate/dist/rules';

// 載入中文化
import tw from 'vee-validate/dist/locale/zh_TW.json';
import App from './App.vue';
import router from './router';

// filter
import currencyFilter from './filters/currency';
import timestampFilter from './filters/timeTransform';
// Vuex
import store from './store';

// 載入所有規則
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);

// filer
Vue.filter('currency', currencyFilter);
Vue.filter('time', timestampFilter);

// 全域啟用 ValidationProvider 跟 ValidationObserver(驗證規則元件)
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

// axios 跨域用
axios.defaults.withCredentials = true;

Vue.config.productionTip = false;

// 把 Vee-validate 規則中文化
localize('zh-TW', tw);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

// 驗證是否登入
router.beforeEach((to, from, next) => {
  // 如果要前往頁面的 meta 有 requiresAuth 的話就進行驗證
  // 沒有就直接切換頁面
  if (to.meta.requiresAuth) {
    // 驗證的 API 路徑
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    // 根據 API 文件，登入方法為 post
    // 因為執行環境是在 router 而不是 APP 內，所以要把 this.$http 改成 axios
    axios.post(api).then((response) => {
      // 如果成功登入就放行
      if (response.data.success) {
        next();
        // 沒有登入的話執行這個
      } else {
        // 使用 next 包物件的方式將網址導回首頁
        next({
          path: '/',
        });
      }
    });
    // 如果不需要驗證的頁面就直接放行
  } else {
    next();
  }
});
