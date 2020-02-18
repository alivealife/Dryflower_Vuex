<template>
  <div>
    <div class="text-right mt-4">
      <!-- 建立新產品所以使用 true 代入 -->
      <button class="btn btn-main" @click="openModal(true)">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <!-- 將不太需要大空間的欄位限制大小，其餘位置讓給產品名稱 -->
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="80">狀態</th>
          <th width="150" class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <!-- item.id 具唯一性，所以 key 使用 item.id -->
        <tr v-for="(item) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price | currency }}</td>
          <td class="text-right">{{ item.price | currency }}</td>
          <td>
            <!-- 如果 is_enabled == 1 為啟用 -->
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <!-- 因為是編輯產品，所以代入 false，並將 item 帶入 -->
            <button class="btn btn-outline-main btn-sm" @click="openModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分頁 -->
    <!-- 把 pagination 的資料丟進 Pagination.vue 的 props 內的 pagination-data 裡 -->
    <Pagination :pagination-data="pagination" @changepage="getProducts"></Pagination>

    <!-- Modal -->
    <!-- 新增/編輯用 -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <!-- 當這格改變時觸發上傳的函式 -->
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  alt
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <!-- 因 API 是 0 跟 1 因此這邊要將 true/false 轉為 0/1 -->
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <!-- 按下時執行更新產品列表 -->
            <button type="button" class="btn btn-main" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 刪除用 Modal -->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
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
      products: [],
      // 用來儲存分頁資料
      pagination: {},
      // 儲存 Modal 的欄位內容
      tempProduct: {},
      isNew: false,
      status: {
        fileUploading: false,
      },
    };
  },
  methods: {
    // 取得產品資料，令 page 預設為 1
    getProducts(page = 1) {
      // 記得要 admin 才是管理者用的 API
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`;
      const vm = this;
      // 將讀取套件設為 true
      vm.$store.state.isLoading = true;
      vm.$http.get(api).then((response) => {
        // 取得完資料後將讀取套件設為 false
        vm.$store.state.isLoading = false;
        // 將產品資料取出並儲存
        vm.products = response.data.products;
        // 取得分頁資料
        vm.pagination = response.data.pagination;
      });
    },
    // 開啟 Modal 判斷用，判斷是新產品還是原本的產品
    openModal(isNew, item) {
      const vm = this;
      if (isNew) {
        vm.tempProduct = {};
        vm.isNew = true;
      } else {
        // 避免傳參考特性，使用 Object.assign 可以將 item 的內容傳到一個新物件裡面
        vm.tempProduct = Object.assign({}, item);
        vm.isNew = false;
      }
      $('#productModal').modal('show');
    },
    // 刪除用的 Modal
    deleteModal(item) {
      this.tempProduct = Object.assign({}, item);
      $('#delProductModal').modal('show');
    },
    // 透過 post 方式將資料新增到資料庫
    updateProduct() {
      // 因為要根據是否是新的產品來判斷用哪個 API，所以把 const 改成 let
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      // 預設傳送行為為 post
      let httpMethod = 'post';
      const vm = this;
      // 如果不是新的產品
      if (!vm.isNew) {
        // 不是新的就帶入修改產品的 API
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        // 根據 API 如果是修改產品要用 put，因此如果不是新產品就改成 put
        httpMethod = 'put';
      }
      // 因為 API 是用一個物件 { data:{} } 的方式，所以要傳出時也要相同格式
      vm.$http[httpMethod](api, {
        data: vm.tempProduct,
      }).then((response) => {
        // 新增成功的話就關閉 modal 並重新取得產品列表
        if (response.data.success) {
          $('#productModal').modal('hide');
          vm.getProducts();
        } else {
          $('#productModal').modal('hide');
        }
      });
    },
    deleteProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      vm.$http.delete(api).then((response) => {
        // 刪除成功的話就關閉 modal 並重新取得產品列表
        if (response.data.success) {
          $('#delProductModal').modal('hide');
          vm.getProducts();
        } else {
          $('#delProductModal').modal('hide');
        }
      });
    },
    uploadFile() {
      // 取出檔案
      const uploadedFile = this.$refs.files.files[0];
      // 清除上傳後的檔案名稱
      const resetFile = this.$refs.files.id;
      const vm = this;
      // formData 用於模擬傳統表單送出(建立 formData 物件)
      const formData = new FormData();
      // 將讀取圖案設為顯示
      vm.status.fileUploading = true;
      // file-to-upload 是 API 提供的名稱，uploadedFile 是要上傳的檔案
      // 將名稱跟檔案 appdend 進 formData
      formData.append('file-to-upload', uploadedFile);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      // 使用 post，前面是網址，後面是檔案內容，物件是用於將格式改為 formData(API 文件的 enctype="multipart/form-data")
      vm.$http
        .post(api, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          // 當上傳結束就把讀取圖案隱藏起來
          vm.status.fileUploading = false;
          // 如果上傳成功就把圖的網址存起來
          if (response.data.success) {
            // 因為一開始的 data 中沒有定義 imageUrl，所以要用 set 的方式讓他雙向綁定強制寫入
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
            // 將檔案名稱清空
            document.getElementById(resetFile).value = '';
          } else {
            vm.$bus.$emit(
              'message:push',
              response.data.message.message,
              'danger',
            );
          }
        });
    },
  },
  // 在 created 裡放入函式讓他在讀取時觸發
  created() {
    this.getProducts();
  },
};
</script>
