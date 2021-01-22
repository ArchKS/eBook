<template>
  <div class="store-shelf">
    <shelf-title></shelf-title>
    <scroll :bottom="7">
      <shelf-search></shelf-search>
      <shelf-list class="shelf-list-component"></shelf-list>
    </scroll>
    <transition name="toast">
      <toast :text="text" :ifPersistence="true"></toast>
    </transition>
  </div>
</template>

<script>
import shelfTitle from "@/components/shelf/shelfTitle.vue";
import shelfSearch from "@/components/shelf/shelfSearch.vue";
import scroll from "../../components/common/Scroll2";
import ShelfList from "@/components/shelf/shelfList";
import Toast from "@/components/common/Toast";
// import "@/mock/";
import { markRaw } from "vue";
import { getReminder, saveReminder } from "@/utils/localStorage";

export default {
  data() {
    return {
      text: "<p>建议分辨率：320 x 568 </p> <p> PC模式下拖拽书籍可实现分组</p>",
    };
  },
  
  components: {
    shelfTitle: markRaw(shelfTitle),
    shelfSearch,
    scroll,
    ShelfList,
    Toast,
  },
};
</script>
<style lang='scss' scoped>
 @import "@/assets/styles/global.scss";
.store-shelf {
  width: 100%;
  height: 100%;
  position: relative;
  .toast-enter,
  .toast-leave-to {
    opacity: 0;
  }
  .toast-leave,
  .toast-enter-to {
    opacity: 1;
  }
  .toast-enter-active,
  .toast-leave-active {
    transition: all 2s ease-in-out;
  }
}
</style>
