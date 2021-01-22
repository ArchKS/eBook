<template>
  <div class="shelf-search-wrapper">
    <div class="shelf-search">
      <div class="search-wrapper">
        <div class="icon-search-wrapper">
          <span class="icon-search icon"></span>
        </div>
        <div class="search-input-wrapper">
          <input
            class="search-input"
            type="text"
            placeholder="搜索"
            @click="onSearchClick"
            v-model="searchText"
          />
        </div>
        <div
          class="icon-clear-wrapper"
          v-show="searchText.length > 0"
          @click="clearSearchText"
        >
          <span class="icon-close-circle-fill"></span>
        </div>
      </div>
      <div class="cancel-btn-wrapper" @click="onCancelClick">
        <span class="cancel-text">取消</span>
      </div>
    </div>
    <!-- <div class="shelf-search-tab-wrapper" v-if="ifInputClicked">
        <div class="shelf-search-tab-item" v-for="item in tabs" :key="item.id" @click="onTabClick(item.id)">
          <span class="shelf-search-tab-text" :class="{'is-selected': item.id === selectedTab}">{{item.text}}</span>
        </div>
      </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    onSearchClick() {},
    clearSearchText() {
      this.searchText = "";
    },
    onCancelClick() {},
  },
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.shelf-search-wrapper {
  height: 2.4rem;
  .shelf-search {
    display: flex;
    height: 100%;
    .search-wrapper {
      flex: 8;
      display: flex;
      margin-left: 1rem;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 0.3rem;
      .icon-search-wrapper {
        @include center;
        margin: 0 0.7rem;
      }
      .search-input-wrapper {
        @include center;
        width: 100%;
        height: 100%;
        .search-input {
          width: 100%;
          height: 70%;
          border: none;
          outline: none;
          &::-webkit-input-placeholder {
            color: $color-gray2;
          }
        }
      }
      .icon-clear-wrapper {
          @include center;
          margin: auto .6rem;
          color: $color-gray2;
      }
    }
    .cancel-btn-wrapper {
      flex: 1;
      padding: 0 0.5rem;
      @include center;
    }
  }
}
</style>

