<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages"
      :key="i"
    >
      {{ item.message }}
      <button
        type="button"
        class="close"
        @click="removeMessage(i)"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  methods: {
    // 送出訊息至 message 時也會觸發把自己移除的函式
    updateMessage(message, status) {
      this.$store.dispatch('updateLoading', { message, status });
    },
    // 用來按下叉叉後關閉訊息
    removeMessage(num) {
      // this.messages.splice(num, 1);
      this.$store.dispatch('removeMessage', num);
    },
    // 五秒一到就移除自己
    // 只有外部傳入的訊息會自動移除，手動寫死的不會
    removeMessageWithTiming(timestamp) {
      this.$store.dispatch('removeMessageWithTiming', timestamp);
    },
  },
  computed: {
    ...mapGetters(['messages']),
  },
};

</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>
