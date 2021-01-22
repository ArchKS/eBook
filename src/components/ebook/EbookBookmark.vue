<template>
  <div class="ebook-bookmark" ref="bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper">
        <span class="icon-down" ref="iconDown"></span>
      </div>
      <div class="ebook-bookmark-text">{{ text }}</div>
    </div>
    <div class="ebook-bookmark-icon-wrapper" :style="isFixed ? styleFixed : {}">
      <bookmark :color="color"></bookmark>
    </div>
  </div>
</template>

<script>
import bookmark from "../common/Bookmark";
import { saveBookmark, getBookmark } from "@/utils/localStorage.js";
const BLUE = "#346cbc";
const WHITE = "#fff";

export default {
  data() {
    return {
      text: "下拉添加书签",
      color: WHITE,
      isFixed: false,
      bookmark: null,
      nowstartCfi: null,
    };
  },
  computed: {
    criticalVal1() {
      return parseInt(this.htmlFontSize) * 1;
    },
    criticalVal2() {
      return parseInt(this.htmlFontSize) * 2;
    },
    styleFixed() {
      return {
        position: "fixed",
        top: 0,
        right: `${(window.innerWidth - this.$refs.bookmark.clientWidth) / 2}px`,
      };
    },
  },
  watch: {
    offsetY(v) {
      /* 书签移动的三个阶段：
       * 1. 书签随着下拉一起下拉
       * 2. 当到一定阈值时，书签吸附在顶部
       * 3. 当继续下拉，书签变色，文字变为"松开添加书签"
       *
       * 如果之前有添加过书签，则再次下拉删除
       */
      if (v === 0) {
        this.restore();
      } else if (v > this.criticalVal1 && v < this.criticalVal2) {
        // console.log("书签吸附");
        this.beforeThreshold();
      } else if (v > this.criticalVal2) {
        // console.log("添加书签");
        this.beforeHeight();
      }
    },
    ifBookmark(v) {
      /* 通过isFixed控制bookmark在界面的显示和隐藏 */
      if (v) {
        this.color = BLUE;
        this.isFixed = true;
      } else {
        this.color = WHITE;
        this.isFixed = false;
      }
    },
  },
  methods: {
    beforeHeight() {},
    beforeThreshold() {
      if (this.ifBookmark) {
        this.text = "松手删除书签";
        this.isFixed = false;
        this.color = WHITE;
      } else {
        this.text = "松手添加书签";
        this.isFixed = true;
        this.color = BLUE;
      }

      this.$refs.iconDown.style.transform = "rotate(180deg)";
      this.$refs.iconDown.style.transition = "all .2s linear";
    },
    restore() {
      this.$refs.iconDown.style.transform = "rotate(0deg)";
      if (this.isFixed) {
        this.SET_IFBOOKMARK(true);
        this.addBookMark();
      } else {
        this.SET_IFBOOKMARK(false);
        this.delBookMark();
      }

      if (this.ifBookmark) {
        this.text = "下拉删除书签";
      } else {
        this.text = "下拉添加书签";
      }
    },

    addBookMark() {
      this.bookmark = getBookmark(this.fileName) || [];
      // 获取当前章节信息
      const currentLocation = this.book.rendition.currentLocation();
      this.nowstartCfi = currentLocation.start.cfi;
      const cfiBase = currentLocation.start.cfi.replace(/!.*/g, "");
      const cfiStart = currentLocation.start.cfi
        .replace(/.*!/g, "")
        .replace(/\)$/, "");
      const cfiEnd = currentLocation.end.cfi
        .replace(/.*!/g, "")
        .replace(/\)$/, "");
      // 拼接章节开始和结束
      const cfiRange = `${cfiBase}!,${cfiStart},${cfiEnd})`;
      // 获取当前章节范围内的内容
      this.book.getRange(cfiRange).then((range) => {
        let text = range.toString().replace(/\s\s/g, "");
        this.bookmark.push({
          cfi: currentLocation.start.cfi,
          text: text,
        });
        saveBookmark(this.fileName, this.bookmark);
      });
    },
    delBookMark() {
      // 查找当前章节
      const currentLocation = this.book.rendition.currentLocation();
      const cfi = currentLocation.start.cfi;
      this.bookmark = getBookmark(this.fileName);
      if (this.bookmark) {
        this.bookmark = this.bookmark.filter((item) => {
          return item.cfi !== cfi;
        });
        saveBookmark(this.fileName, this.bookmark);
      }
    },
  },
  components: {
    bookmark,
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.ebook-bookmark {
  position: absolute;
  top: -10rem;
  left: 0;

  height: 10rem;
  width: 100%;

  z-index: 200;
  background-color: $color-black-blue;

  .ebook-bookmark-text-wrapper {
    position: absolute;
    right: 3rem;
    bottom: 0;
    display: flex;
    .ebook-bookmark-down-wrapper {
      font-size: 14px;
      color: $color-white;
      transition: all 0.2s linear;
      @include center;
    }
    .ebook-bookmark-text {
      font-size: 1.1rem;
      color: $color-white;
    }
  }
  .ebook-bookmark-icon-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: 1rem;
  }
}
</style>