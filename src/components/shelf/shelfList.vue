// 书架列表组件
<template>
  <div class="shelf-list">
    <div class="shelf-item-wrapper">
      <div class="shelf-items" v-for="(item, index) in shelfList" :key="index">
        <shelf-item
          :data="item"
          class="item-instance"
          :style="{ height: Height }"
        >
        </shelf-item>
      </div>
    </div>
  </div>
</template>

<script>
import shelfItem from "./shelfItem";
import { shelf } from "@/api/";
import { getBookShelfList } from "@/utils/localStorage";
export default {
  components: {
    shelfItem,
  },
  computed: {
    Height() {
      return `${
        ((window.innerWidth / 3 - parseFloat(this.htmlFontSize) * 2) * 350) /
        250
      }px`;
    },
  },
  created() {
    // 获取书架的图书数据
    let itemlist = getBookShelfList();
    itemlist = this.ifAddIsExit(itemlist);
  },
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.shelf-list {
  width: 100%;
  height: 100%;
  .shelf-item-wrapper {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    padding: 1rem 1rem;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin-top: -1.5rem;
    .shelf-items {
      width: 33.33%;
      padding: 2rem 1rem;
      box-sizing: border-box;
      margin-top: 1.5rem;
      @include center;

      .item-instance {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
