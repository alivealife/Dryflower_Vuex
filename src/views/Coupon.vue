<template>
  <div>
    <div class="text-right mt-4">
      <!-- 建立新優惠券所以使用 true 代入 -->
      <button class="btn btn-main" @click="openModal(true)">建立新的優惠券</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>標題</th>
          <th width="80">折扣</th>
          <th width="120">到期日</th>
          <th width="80">折扣碼</th>
          <th width="80">啟用</th>
          <th width="150" class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <!-- item.id 具唯一性，所以 key 使用 item.id -->
        <tr v-for="(item) in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.percent }} %</td>
          <td>{{ item.due_date | time }}</td>
          <td class="text-right">{{ item.code }}</td>
          <td>
            <!-- 如果 is_enabled == 1 為啟用 -->
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <!-- 因為是編輯優惠券，所以代入 false，並將 item 帶入 -->
            <button class="btn btn-outline-main btn-sm" @click="openModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分頁 -->
    <!-- 把 pagination 的資料丟進 Pagination.vue 的 props 內的 pagination-data 裡 -->
    <Pagination :pagination-data="pagination" @changepage="getCoupon"></Pagination>

    <!-- Modal -->
    <!-- 新增/編輯 Coupon -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="tempCoupon.title"
                placeholder="請輸入標題"
              />
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="percent_off">折扣數</label>
                <input
                  type="number"
                  class="form-control"
                  id="percent_off"
                  v-model="tempCoupon.percent"
                  placeholder="請輸入折扣數"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="code">Code</label>
                <input
                  type="text"
                  class="form-control"
                  id="code"
                  v-model="tempCoupon.code"
                  placeholder="請輸入 Code"
                />
              </div>
            </div>
            <hr />
            <div class="form-group">
              <label for="last_date">到期日</label>
              <input type="date" class="form-control" id="last_date" v-model="last_date" />
            </div>
            <div class="form-group">
              <div class="form-check">
                <!-- 因 API 是 0 跟 1 因此這邊要將 true/false 轉為 0/1 -->
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="is_enabled"
                  v-model="tempCoupon.is_enabled"
                  :true-value="1"
                  :false-value="0"
                />
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <!-- 按下時執行更新優惠券列表 -->
            <button type="button" class="btn btn-main" @click="updateCoupon">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 刪除 Coupon -->
    <div
      class="modal fade"
      id="delcouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteCoupon">確認刪除</button>
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
import Pagination from '../components/Pagination.vue';
// 使用 export 讓其他元件也能取用
export default {
  components: {
    // 載入分頁元件
    Pagination,
  },
  data() {
    return {
      coupons: [],
      // 用來儲存分頁資料
      pagination: {},
      // 儲存 Modal 的欄位內容
      tempCoupon: {},
      couponLastday: '',
      isNew: false,
      // 用來儲存時間
      last_date: new Date(),
    };
  },
  // 優惠券日期用
  // 當日期變動時就把日期轉成 timestamp 格式
  watch: {
    last_date() {
      const vm = this;
      const timestamp = Math.floor(new Date(vm.last_date) / 1000);
      vm.tempCoupon.due_date = timestamp;
    },
  },
  methods: {
    // 取得優惠券資料，令 page 預設為 1
    getCoupon(page = 1) {
      // 記得要 admin 才是管理者用的 API
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      const vm = this;
      // 將讀取套件設為 true
      vm.$store.state.isLoading = true;
      this.$http.get(api).then((response) => {
        // 取得完資料後將讀取套件設為 false
        vm.$store.state.isLoading = false;
        // 將優惠券資料取出並儲存
        vm.coupons = response.data.coupons;
        // 取得分頁資料
        vm.pagination = response.data.pagination;
      });
    },
    // 開啟 Modal 判斷用，判斷是新優惠券還是原本的優惠券
    openModal(isNew, item) {
      const vm = this;
      if (isNew) {
        this.tempCoupon = {};
        this.isNew = true;
      } else {
        // 避免傳參考特性，使用 Object.assign 可以將 item 的內容傳到一個新物件裡面
        this.tempCoupon = Object.assign({}, item);
        // 將時間丟回給選擇日期的標籤
        // IOS格式的日期字串看起來會像是這樣 YYYY-MM-DDTHH:mm:ss.sssZ
        const couponDate = new Date(vm.tempCoupon.due_date * 1000)
          .toISOString()
          .split('T');
        // 經過上面的處理後 couponDate 會變成一個陣列
        // 0 - 儲存年月日
        // 1 - 儲存時間
        const today = couponDate[0];
        vm.last_date = today;
        this.isNew = false;
      }
      $('#couponModal').modal('show');
    },
    // 刪除用的 Modal
    deleteModal(item) {
      this.tempCoupon = Object.assign({}, item);
      $('#delcouponModal').modal('show');
    },
    // 透過 post 方式將資料新增到資料庫
    updateCoupon() {
      // 因為要根據是否是新的優惠券來判斷用哪個 API，所以把 const 改成 let
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      // 預設傳送行為為 post
      let httpMethod = 'post';
      const vm = this;
      // 如果不是新的優惠券
      if (!vm.isNew) {
        // 不是新的就帶入修改優惠券的 API
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        // 根據 API 如果是修改優惠券要用 put，因此如果不是新優惠券就改成 put
        httpMethod = 'put';
      }
      // 因為 API 是用一個物件 { data:{} } 的方式，所以要傳出時也要相同格式
      this.$http[httpMethod](api, {
        data: vm.tempCoupon,
      }).then((response) => {
        // 新增成功的話就關閉 modal 並重新取得優惠券列表
        if (response.data.success) {
          $('#couponModal').modal('hide');
          vm.getCoupon();
          // console.log(document.getElementById("last_date").value);
        } else {
          $('#couponModal').modal('hide');
          // alert("新增失敗");
        }
      });
    },
    deleteCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      this.$http.delete(api).then((response) => {
        // 刪除成功的話就關閉 modal 並重新取得優惠券列表
        if (response.data.success) {
          $('#delcouponModal').modal('hide');
          vm.getCoupon();
        } else {
          $('#delcouponModal').modal('hide');
          // alert("刪除錯誤，找不到優惠券");
        }
      });
    },
  },
  // 在 created 裡放入函式讓他在讀取時觸發
  created() {
    this.getCoupon();
  },
};
</script>
