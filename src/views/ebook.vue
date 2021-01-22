<template>
  <div class="ebook" ref="ebook">
    <!-- 页眉 -->
    <ebook-header></ebook-header>
    <!-- 标题栏 -->
    <ebook-title></ebook-title>
    <!-- 阅读器 -->
    <ebook-reader></ebook-reader>
    <!-- 菜单栏 -->
    <ebook-menu></ebook-menu>
    <!-- 字体设置 -->
    <font-fmaily-setting></font-fmaily-setting>
    <!-- 主题设置 -->
    <ebook-theme-setting></ebook-theme-setting>
    <!-- 进度设置 -->
    <ebook-progress-setting></ebook-progress-setting>
    <!-- 目录设置 -->
    <ebook-slide></ebook-slide>
    <!-- 书签设置 -->
    <ebook-bookmark></ebook-bookmark>
    <!-- 页脚 -->
    <ebook-footer></ebook-footer>
  </div>
</template>

<script>
import EbookTitle from "../components/ebook/EbookTitle";
import EbookMenu from "../components/ebook/EbookMenu";
import EbookReader from "../components/ebook/EbookReader";
import FontFmailySetting from "../components/ebook/EbookFontSettingUp";
import EbookThemeSetting from "../components/ebook/EbookThemeSetting";
import EbookProgressSetting from "../components/ebook/EbookProgressSetting";
import EbookSlide from "../components/ebook/EbookSlide";
import EbookBookmark from "../components/ebook/EbookBookmark";
import EbookHeader from "../components/ebook/EbookHeader"
import EbookFooter from "../components/ebook/EbookFooter"

import { getReadTime, saveReadTime } from "@/utils/localStorage";
export default {
  data() {
    return {
      timer: null,
    };
  },
  components: {
    EbookReader,
    EbookMenu,
    EbookTitle,
    FontFmailySetting,
    EbookThemeSetting,
    EbookSlide,
    EbookProgressSetting,
    EbookBookmark,
    EbookHeader,
    EbookFooter,
  },
  methods: {
    loopReadTime() {
      let readTime = getReadTime(this.fileName);
      // 获取阅读时间，如果不存在则创建
      if (!readTime) {
        readTime = 0;
      }
      // 开启定时任务，每30s记录一次
      this.timer = setInterval(() => {
        readTime++;
        readTime % 30 === 0 ? saveReadTime(this.fileName, readTime) : null;
      }, 1000);
    },
    restore() {
      this.$refs.ebook.style.top = 0;
      this.$refs.ebook.style.transition = "all .2s linear";
      setTimeout(() => {
        this.$refs.ebook.style.transition = "";
      }, 200);
    },
    move(v) {
      this.$refs.ebook.style.top = v + "px";
    },
  },
  mounted() {
    this.loopReadTime();
    this.getHTMLFontSize();
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  watch: {
    offsetY(v) {
      // 如果标题栏存在，则不能下拉
      // 如果分页未完成，则不能下拉
      if (!this.ifTitleAndMenuVisiable && this.bookAvailable) {
        if (v > 0) {
          this.move(v);
        } else if (v === 0) {
          this.restore();
        }
      }
    },

  },

};
</script>
<style lang='scss' scoped>
 @import "@/assets/styles/global.scss";
.ebook {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>