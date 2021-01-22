<template>
  <div>
    <div class="hot-search-title">
      <span class="label">{{ label }}</span>
      <span class="btn">{{ btn }}</span>
    </div>
    <div class="hot-search-list">
      <div
        class="hot-search-item"
        v-for="(item, index) in hotSearch"
        :key="index"
      >
        <div class="icon-wrapper">
          <span class="icon-book icon" v-if="item.type === 1"></span>
          <span class="icon-search icon" v-if="item.type === 2"></span>
        </div>
        <div class="hot-search-text-wrapper">
          <div class="text" ref="searchText">{{ item.text }}</div>
          <div class="num" v-if="item.num">{{ item.num }}人搜索</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    label: String,
    btn: String,
    hotSearch: Array,
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "@/assets/styles/global.scss";

.hot-search-title {
  display: flex;
  width: 100%;
  padding: px2rem(10);
  box-sizing: border-box;
  .label {
    flex: 1;
    text-align: left;
    font-weight: bold;
    color: $color-gray3;
  }
  .btn {
    flex: 1;
    text-align: right;
    font-weight: bold;
    color: $color-blue2;
  }
}
.hot-search-list {
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
  .hot-search-item {
    padding: 0.8rem 0;
    display: flex;
    .icon-wrapper {
      flex: 0 0 px2rem(40);
      @include center;
      .icon-book {
        font-size: 1rem;
      }
      .icon-search {
        font-size: 1rem;
      }
    }
    .hot-search-text-wrapper {
      flex: 1;
      height: 2.5rem;
      padding: 0 0.6rem;
      @include left;
      .text {
        flex: 2;
        height: 100%;
        font-size: 1rem;
        font-weight: bold;
        padding: 0.2rem 0;
        color: #666;
        @include ellipsis;
        @include left;
      }
      .num {
        flex: 1;
        font-size: 0.7rem;
        color: #999;
        margin-top: 0.4rem;
      }
    }
  }
}
</style>
