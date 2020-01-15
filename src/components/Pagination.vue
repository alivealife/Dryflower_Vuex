<template>
  <!-- 分頁 -->
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <!-- 當 pagination.has_pre 是 false 時，禁止點擊(也就是沒有上一頁的話就不可以點) -->
      <li class="page-item" :class="{'disabled': !paginationData.has_pre}">
        <!-- 點擊時將目前分頁 pagination.current_page -1 代入 getProducts 達成切換分頁 -->
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="changePage(paginationData.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <!-- pagination.current_page == page 時就機 active 標籤 -->
      <li
        class="page-item"
        v-for="page in paginationData.total_pages"
        :key="page"
        :class="{'active': paginationData.current_page == page}"
      >
        <!-- 點擊時看是哪一頁就帶入 getProducts 達成切換分頁 -->
        <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
      </li>
      <!-- 當 pagination.has_next 是 false 時，禁止點擊(也就是沒有下一頁的話就不可以點) -->
      <li class="page-item" :class="{'disabled': !paginationData.has_next}">
        <!-- 點擊時將目前分頁 pagination.current_page +1 代入 getProducts 達成切換分頁 -->
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="changePage(paginationData.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    // 用來接收外部元件的資料
    paginationData: {
      // 預設為空物件
      type: Object,
      // 如果要預設資料內容要改成函式方式呈現，這樣 eslint 才不會報錯
      default: () => {},
    },
  },
  methods: {
    changePage(page) {
      this.$emit('changepage', page);
    },
  },
};
</script>
