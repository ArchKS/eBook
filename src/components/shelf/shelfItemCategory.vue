// 书架列表的 分组/分类 组件
<template>
  <div class="shelf-category" @click="enterCategory">
    <div class="shelf-category-wrapper">
      <div
        class="shelf-category-item"
        v-for="(item, index) in itemList"
        :key="index"
      >
        <img :src="item.cover" class="shelf-category-item-cover" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  computed: {
    itemList() {
      if (this.data) {
        return this.data.itemList.splice(0, 9);
      } else {
        return [];
      }
    },
  },
  methods: {
    enterCategory() {
      // 进入书架内部，实际上是打开另一个组件
      this.setIfCategoryVisible(true);
      this.setCategoryData(this.data);
      this.$router.push({ path: "/store/category" });
    },
  },
};
</script>

<style lang='scss' scoped>
.shelf-category {
  width: 100%;
  height: 100%;
  .shelf-category-wrapper {
    display: flex;
    flex-flow: row wrap;
    box-sizing: border-box;
    padding: 0.4rem 0 0 0.1rem;
    .shelf-category-item {
      width: 33.33%;
      height: 33.33%;
      &:nth-child(3n + 1) {
        padding: 0.1rem 0.1rem 0.1rem 0.1rem;
      }
      &:nth-child(3n + 2) {
        padding: 0.1rem 0.1rem 0.1rem 0.1rem;
      }
      &:nth-child(3n + 3) {
        padding: 0.1rem 0.1rem 0.1rem 0.1rem;
      }

      box-sizing: border-box;
      .shelf-category-item-cover {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
