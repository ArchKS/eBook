<template>
  <div
    class="toast-wrapper"
    v-if="ifShowToast"
    @mouseenter="toastOn"
    @mouseleave="toastOff"
  >
    <div class="toast-text" v-html="text"></div>
  </div>
</template>

<script>
import { getReminder, saveReminder } from "@/utils/localStorage";

export default {
  data() {
    return {
      ifShowToast: false,
      animationTime: 1000,
      task: -1,
    };
  },
  props: {
    text: {
      type: String,
      default: "温馨提示",
    },
    // 鼠标进入
    MouseEnterFocus: {
      type: Boolean,
      default: true,
    },
    // 鼠标离开
    MouseLeaveOff: {
      type: Boolean,
      default: true,
    },
    // 是否开启持久化，存储到localStorage
    ifPersistence: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toastOn() {
      if (this.MouseEnterFocus) {
        this.ifShowToast = true;
        clearTimeout(this.task);
        this.ifShowToast = true;
      }
    },
    toastOff() {
      if (this.MouseLeaveOff) {
        this.task = setTimeout(() => {
          this.ifShowToast = false;
        }, this.animationTime / 6);
      }
    },
  },
  mounted() {
    // 如果没有展示，则展示,并将其置为true
    // 如果已经展示过了，则不做
    let reminder = getReminder();
    console.log(this.ifPersistence);
    if (this.ifPersistence && !reminder) {
      this.ifShowToast = true;
      this.task = setTimeout(() => {
        this.ifShowToast = false;
        saveReminder(true);
      }, this.animationTime);
    } else if (!this.ifPersistence) {
      this.ifShowToast = true;
      this.task = setTimeout(() => {
        this.ifShowToast = false;
      }, this.animationTime);
    }
  },
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.toast-wrapper {
  width: 16rem;
  height: 4rem;
  
  line-height: 1.5rem;
  font-size: 1rem;

  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: 0.3rem 0.2rem 0.3rem 0.2rem rgba(0, 0, 0, 0.3);

  color: $color-white;
  background-color: rgba(#000000, 0.7);

  @include absCenter; 
  @include center;
  .toast-text {
    padding: 0.4rem 1rem;
  }
}
</style>