<template>
  <div>
    <div class="vld-parent">
    </div>

    <table class="table mt-5">
      <thead>
        <tr>
          <!-- 將不太需要大空間的欄位限制大小，其餘位置讓給產品名稱 -->
          <th width="120">購買時間</th>
          <th width="150">Email</th>
          <th>購買項目</th>
          <th width="100">應付金額</th>
          <th width="100">是否付款</th>
          <th width="80">編輯</th>
        </tr>
      </thead>
      <tbody>
        <!-- item.id 具唯一性，所以 key 使用 item.id -->
        <tr v-for="(item) in orders" :key="item.id">
          <td>{{ item.create_at | time}}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, index) in item.products" :key="index">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total | currency }}</td>
          <td>
            <!-- 如果 is_enabled == 1 為啟用 -->
            <span v-if="item.is_paid" class="text-success">已付款</span>
            <span v-else>未付款</span>
          </td>
          <td>
            <button class="btn btn-outline-main btn-sm" @click="openModal(item)">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分頁 -->
    <!-- 把 pagination 的資料丟進 Pagination.vue 的 props 內的 pagination-data 裡 -->
    <Pagination :pagination-data="pagination" @changepage="getOrders"></Pagination>

    <!-- Modal -->
    <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>編輯訂單</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <div class="form-check">
                <!-- 因 API 是 0 跟 1 因此這邊要將 true/false 轉為 0/1 -->
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="is_paid"
                  v-model="tempOrder.is_paid"
                />
                <label class="form-check-label" for="is_paid">是否付款</label>
                {{tempOrder.id}}
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <!-- 按下時執行更新產品列表 -->
            <button type="button" class="btn btn-main" @click="updateOrder">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import jquery 才能使用 jquery
// $ 也可自己定義，import jquey from 'jquery'; 也可以
import $ from 'jquery';
// 掛載分頁切換元件
import Pagination from '../../components/Pagination.vue';
// 使用 export 讓其他元件也能取用
export default {
  components: {
    // 載入分頁元件
    Pagination,
  },
  data() {
    return {
      orders: [],
      // 用來儲存分頁資料
      pagination: {},
      // 儲存 Modal 的欄位內容
      tempOrder: {},
    };
  },
  methods: {
    // 取得產品資料，令 page 預設為 1
    getOrders(page = 1) {
      // 記得要 admin 才是管理者用的 API
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
      const vm = this;
      // 將讀取套件設為 true
      vm.$store.state.isLoading = true;
      vm.$http.get(api).then((response) => {
        // 取得完資料後將讀取套件設為 false
        vm.$store.state.isLoading = false;
        // 將產品資料取出並儲存
        vm.orders = response.data.orders;
        // 取得分頁資料
        vm.pagination = response.data.pagination;
      });
    },
    // 開啟 Modal 用
    openModal(item) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${item.id}`;
      const vm = this;
      vm.$http.get(api).then(() => {
        // 避免傳參考特性，使用 Object.assign 可以將 item 的內容傳到一個新物件裡面
        vm.tempOrder = Object.assign({}, item);
        $('#orderModal').modal('show');
      });
    },
    // 編輯訂單
    updateOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${vm.tempOrder.id}`;
      vm.$http
        .put(api, {
          data: vm.tempOrder,
        })
        .then((response) => {
          // 新增成功的話就關閉 modal 並重新取得產品列表
          if (response.data.success) {
            $('#orderModal').modal('hide');
            vm.getOrders();
          } else {
            $('#orderModal').modal('hide');
          }
        });
    },
  },
  // 在 created 裡放入函式讓他在讀取時觸發
  created() {
    this.getOrders();
  },
};
</script>
