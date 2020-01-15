<template>
  <div>
    <header>
      <NavBar />
    </header>
    <div class="container py-5">
      <div class="row">
        <div class="col-md-6 pt-5 mb-5">
          <div class="side-wrap shadow">
            <img
              src="../assets/images/peter-bucks-TSoShIT8mO4-unsplash (1).jpg"
              alt
              class="side-img"
            />
            <div class="text-third side-text h4 font-weight-bold font-italic">
              <p>找不到您喜歡的樣式嗎？</p>
              <p>不用擔心，聯絡我們吧！</p>
              <p>我們的服務一定讓您滿意</p>
            </div>
          </div>
        </div>
        <!-- 預設給顧客填寫資料 -->
        <div class="col-md-6" v-if="!contactStatus">
          <ValidationObserver
            class="text-secondary"
            ref="observer"
            v-slot="{ invalid }"
            tag="form"
            @submit.prevent="sendContact()"
          >
            <h4 class="text-main">基本資料</h4>
            <div class="form-row mb-3">
              <ValidationProvider name="姓名" rules="required" v-slot="{ errors }" class="col-md-6">
                <label for="username">姓名</label>
                <input
                  type="text"
                  class="form-control"
                  name="name"
                  id="username"
                  placeholder="輸入姓名"
                  v-model="form.user.name"
                  :class="{'is-invalid': errors[0]}"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                name="電話"
                rules="required|min:10"
                v-slot="{ errors }"
                class="col-md-6"
              >
                <label for="usertel">電話</label>
                <input
                  type="tel"
                  class="form-control"
                  id="usertel"
                  placeholder="請輸入電話"
                  v-model="form.user.tel"
                  :class="{'is-invalid': errors[0]}"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider
                name="Email"
                rules="required|email"
                v-slot="{ errors }"
                ref="emailField"
              >
                <label for="useremail">Email</label>
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  id="useremail"
                  placeholder="請輸入 Email"
                  v-model="form.user.email"
                  :class="{'is-invalid': errors[0]}"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <label for="comment">留言</label>
              <textarea name id="comment" class="form-control" cols="30" rows="5"></textarea>
            </div>
            <div class="text-right">
              <button class="btn btn-main btn-block" :disabled="invalid">
                <i class="fas fa-envelope"></i> 連絡我們
              </button>
            </div>
          </ValidationObserver>
        </div>
        <div class="col-md-6 d-flex align-items-center" v-else>
          <h4 class="text-main">感謝您的來信，我們會盡快與您聯繫。</h4>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Contact',
  components: {
    NavBar,
    Footer,
  },
  data() {
    return {
      // 顧客資料用
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
        },
        message: '',
      },
      contactStatus: false,
    };
  },
  methods: {
    sendContact() {
      const vm = this;
      vm.contactStatus = true;
    },
  },
};
</script>
