// 书架的标题
<template>
  <div class="shelf-title">
    <div class="clear-cache-btn" @click="clearShelfList">
      <span key="345" v-if="isEditMode">清除书籍</span>
      <span key="123" v-else-if="!isEditMode">清除缓存</span>
    </div>
    <div class="shelf-title-wrapper">
      <span class="main-title">书架</span>
      <span class="sub-title" v-if="isEditMode">{{ subTitle }}</span>
    </div>
    <div class="edit-btn" @click="editClick">{{ editText }}</div>
  </div>
</template>

<script>
import { saveBookShelfList } from "@/utils/localStorage";
export default {
  computed: {
    editText() {
      if (this.isEditMode) {
        return "取消";
      } else {
        return "编辑";
      }
    },
    subTitle() {
      // 如果当前选择列表为空，则显示 '添加书籍'
      // 如果当前选择列表不为空，则显示 '已选择N本书籍'
      let len = this.shelfSelected.length || 0;
      if (len === 0) {
        return "添加书籍";
      } else {
        return `已选择${len}本`;
      }
    },
  },
  methods: {
    editClick() {
      this.SET_SHELF_SELECTED([]);
      this.SET_EDIT_MODE();
    },
    clearShelfList() {
      console.log("清除缓存");
      // 如果选择列表为空，则清除所有书籍
      // 如果选择列表不为空，则清除选择列表中的书籍

      if (this.shelfSelected.length > 0) {
        let newShelfList = [];
        for (let i = 0; i < this.shelfList.length; i++) {
          let tmp = this.shelfList[i];
          if (!this.shelfSelected.some((item) => item.bookId == tmp.bookId)) {
            newShelfList.push(tmp);
          }
        }
        this.SET_SHELF_LIST(newShelfList);
        saveBookShelfList(newShelfList);
        console.log("写入到vuex");
      } else {
        this.clearBookShelf();
      }
    },
  },
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.shelf-title {
  width: 100%;
  height: 3.3rem;
  @include twoSide;

  .clear-cache-btn {
    padding-left: 0.7rem;
    color: rgba(0, 0, 0, 0.6);
  }
  .shelf-title-wrapper {
    @include vertical;
    background-color: $color-white;
    .main-title {
      line-height: 1rem;
      font-weight: bold;
      height: 1rem;
    }
    .sub-title {
      font-size: 0.8rem;
      line-height: 1rem;
      height: 1rem;
      padding: 0.3rem 0;
      overflow: visible !important;
    }
  }
  .edit-btn {
    padding-right: 0.7rem;
    color: rgba(0, 0, 0, 0.6);
  }
}
</style>

