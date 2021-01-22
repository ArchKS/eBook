<template>
  <div>
    <div class="search-bar" :class="{ 'hide-title': !titleVisible, 'hide-shadow': shadowVisible }">
      <div class="search-bar-title-wrapper" v-show="titleVisible" :class="{ 'hide-title': !titleVisible }">
        <div class="title-text-wrapper">
          <div class="title-text">书城</div>
        </div>

        <div class="title-icon-shake-wrapper" @click="showFlapCard">
          <div class="icon-shake"></div>
        </div>
      </div>

      <div class="title-icon-back-wrapper" :class="{ 'hide-title': !titleVisible }">
        <div class="icon-back" @click="back"></div>
      </div>

      <div class="search-bar-input-wrapper" :class="{ 'hide-title': !titleVisible }">
        <div class="input-blank" :class="{ 'hide-title': !titleVisible }"></div>
        <div class="search-bar-input">
          <span class="icon-search icon"></span>
          <input type="text" class="input" placeholder="计算机科学和软件工程" @click="showHotSearch"/>
        </div>
      </div>
    </div>

    <hot-search-list v-if="hotSearchVisible"></hot-search-list>
  </div>
</template>

<script>
/* 

总高度： 
title： 1.6Height + 0.4top
search: 3.0Height + 2top


hide 
search-bar ： 3rem height 0 top
search-bar-input-wrapper ： height 3rem 0 top      
*/
import HotSearchList from "./HotSearchList";
export default {
  data() {
    return {
      titleVisible: true,
      shadowVisible: false, // 如果滚轮向下移动则阴影出现
      hotSearchVisible: false,
    };
  },
  components: {
    HotSearchList,
  },
  watch: {
    /* 几个组件：
        * 书城标题
        * 阴影
        * 返回按钮
      * 实现逻辑
        * 下拉时标题隐藏；阴影出现
        * 滑倒顶部时，标题出现，阴影隐藏
        * 在hotsearch模式下，点击按钮关闭hotsearch
        * 不再hotsearch模式下，点击按钮会回到书架列表
      * BUG原因：取消了Scroll2组件中setOffsetY方法，因为该方法会导致/ebook/:fileName组件中，滚动进度条造成添加书签的行为
      * 解决方式：offSetY换为 homeOffSetY()
    */
    homeOffSetY(v) {
      if (v > 0) {
        this.hideTitle();
        this.showShadow();
      } else {
        this.showTitle();
        this.hideShadow();
      }
    },
  },
  methods: {
    hideTitle() {
      this.titleVisible = false;
    },
    showTitle() {
      this.titleVisible = true;
    },
    hideShadow() {
      this.shadowVisible = false;
    },
    showShadow() {
      this.shadowVisible = true;
    },
    hideHotSearch() {
      this.hotSearchVisible = false;
    },
    showHotSearch() {
      this.hideTitle();
      this.hotSearchVisible = true;
    },
    back() {
      // 退出搜索模式
      // 如果当前offsetY>0，则不显示标题;小于0则显示标题
      // 如果当前在搜索模式，则点击back退出搜索模式
      // 如果当前不再搜索模式，点击back则回到书架列表
      if (this.hotSearchVisible === true) {
        this.hideHotSearch();
        if(this.homeOffSetY === 0){
          this.showTitle();
          this.hideShadow();
        }
      } else {
        this.$router.push({
          path: "/store/shelf",
        });
      }
    },
    showFlapCard() {
      this.SET_FLAP_CARD_VISIBLE(true);
    },
  },
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
%iconstyle {
  font-size: 1.6rem;
  color: #333;
}

$transitionTime: 0.1s;
$transitionStyle: linear;

.search-bar {
  position: relative;
  height: 5rem;
  z-index: 1;
  transition: all $transitionTime $transitionStyle;
  &.hide-title {
    top: 0;
    height: 3rem;
  }
  &.hide-shadow {
    box-shadow: 0 0.1rem 0.1rem 0 rgba(0, 0, 0, 0.15);
  }
  .search-bar-title-wrapper {
    position: absolute;
    height: 1.6rem;
    width: 100%;
    top: 0.4rem;

    /* 书城标题 */
    .title-text-wrapper {
      position: absolute;
      left: 50%;
      font-weight: bold;
      transform: translatex(-50%);
      font-size: 1.2rem;
      @include center;
      @extend %iconstyle;
    }

    /* 抖动图标 */
    .title-icon-shake-wrapper {
      position: absolute;
      right: 1.2rem;
      @extend %iconstyle;
      @include center;
    }
  }
  /* 返回图标 */
  .title-icon-back-wrapper {
    position: absolute;
    left: 1rem;
    top: 0.4rem;
    z-index: 3;
    @extend %iconstyle;
    @include center;
    transition: top $transitionTime $transitionStyle;
    &.hide-title {
      top: 1.5rem;
      transform: translate(-10%, -60%);
    }
  }

  .search-bar-input-wrapper {
    position: absolute;
    height: 3rem;
    top: 2rem;
    width: 100%;
    padding: 0.4rem;
    box-sizing: border-box;
    transition: top $transitionTime $transitionStyle;
    &.hide-title {
      top: 0;
    }

    display: flex;
    .input-blank {
      transition: all $transitionTime $transitionStyle;
      &.hide-title {
        flex: 0.1;
      }
    }

    .search-bar-input {
      flex: 1;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      background: $color-gray1;
      border-radius: 1rem;
      border: 1px solid $color-gray1;
      @include left;
    }
    .icon-search {
      @extend %iconstyle;
      font-size: 1.2rem;
      padding: 0 0.3rem 0 0.8rem;
    }
    .input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background: transparent;
    }
    .input::-webkit-input-placeholder {
      color: $color-gray2;
    }
  }
}
</style>