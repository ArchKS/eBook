<template>
  <div class="ebook-slide-bookmark">
    <div class="slide-bookmark-title">
      书签 · {{ bookmark ? bookmark.length : 0 }}
    </div>
    <scroll
      class="slide-bookmark-list"
      :style="{ height: height + 'px' }"
      :height="height"
    >
      <div
        class="slide-bookmark-item"
        v-for="(item, index) in bookmark"
        :key="index"
      >
        <div class="slide-bookmark-item-icon">
          <div class="icon-bookmark" @click="delBookmark(item.cfi)"></div>
        </div>
        <div class="slide-bookmark-item-text" @click="displayBookmark(item.cfi)">{{ item.text }}</div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getBookmark,saveBookmark } from "@/utils/localStorage";
export default {
  data() {
    return {
      bookmark: 0,
      height: 0,
    };
  },
  methods: {
    computedCataloguHeight() {
      let eleClassNmame = [
        ".content-page-tab",
        ".slide-contents-search-wrapper",
        ".slide-contents-book-wrapper",
      ];
      let remtopx = 3 * 37.5;
      this.height =
        window.innerHeight +
        remtopx -
        eleClassNmame.reduce((res, item) => {
          let ele = document.querySelector(item);
          let pxheight = getComputedStyle(ele).height;
          let numHeight = parseInt(pxheight) * 2;
          res += numHeight;
          return res;
        }, 0);
    },
    displayBookmark(href){
        console.log('dodisplay ?',href);
        this.displays(href,()=>{
            this.TOGGLE_TITLEANDMENUVISIABLE()
        })
    },
    delBookmark(cfi){
      this.bookmarks = getBookmark(this.fileName);
      this.bookmark = this.bookmark.filter(item => item.cfi !== cfi);
      saveBookmark(this.fileName);
      e.preventDefault();
      e.stopPropagation();
    }
  },
  created() {
    this.bookmark = getBookmark(this.fileName);
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.ebook-slide-bookmark {
  .slide-bookmark-title {
      height: 2rem;
      padding: 1.5rem;
      font-size: 16px;
      font-weight: bold;
      box-sizing: border-box;
    @include left;
  }
  .slide-bookmark-list {
    .slide-bookmark-item {
        display: flex;
        height: 3rem;
        padding: 0.2rem .4rem;
      .slide-bookmark-item-icon {
          @include left;
        .icon-bookmark {
            font-size: 14px;
            width: .8rem;
            height: .8rem;
            background: $color-gray5;
        }
      }
      .slide-bookmark-item-text {
          line-height: 1rem;
          @include ellipseWithLine(3);
      }
    }
  }
}
</style>