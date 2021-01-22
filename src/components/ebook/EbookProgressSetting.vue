<template>
  <div class="setting-wrapper" v-show="ifTitleAndMenuVisiable && ifSettingVisible === 1">
    <div class="setting-progress">
      <div class="read-time-wrapper">
        <span class="read-time-text">{{ getTimeText }}</span>
      </div>
      <div class="progress-wrapper">
        <div class="progress-icon-wrapper" @click="prevSection()">
          <span class="icon-back"></span>
        </div>

        <input
          class="progress"
          type="range"
          max="100"
          min="0"
          step="1"
          @change="onProgressChange($event.target.value)"
          @input="onProgressInput($event.target.value)"
          :value="progress"
          :disabled="!bookAvailable"
          ref="progress"
        />

        <div class="progress-icon-wrapper" @click="nextSection()">
          <span class="icon-forward"></span>
        </div>
      </div>
      <div class="text-wrapper">
        <span class="progress-section-text">{{ getSectionName }}</span>
        <span>({{ bookAvailable ? progress + "%" : "加载中..." }})</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getReadTime, getSection, saveSection } from "@/utils/localStorage";
export default {
  methods: {
    onProgressChange(progress) {
      this.SET_PROGRESS(progress);
      this.displayProgress();
      this.updateProgressBg();
      this.refreshLocation();
    },
    onProgressInput(progress) {
      this.SET_PROGRESS(progress);
      this.displayProgress();
      this.updateProgressBg();
      this.refreshLocation();
    },
    displayProgress() {
      // 根据进度条的值渲染页面，即拖动进度条可以向前向后翻页
      const cfi = this.book.locations.cfiFromPercentage(this.progress / 100);
      this.displays(cfi);
    },
    updateProgressBg() {
      // 拖动进度条时，左侧背景加深
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`;
    },

    prevSection() {
      if (this.section > 0 && this.bookAvailable) {
        this.SET_SECTION(this.section - 1);
        this.displaySection();
      }
    },
    nextSection() {
      // spine 表示阅读进度
      if (this.section < this.book.spine.length - 1 && this.bookAvailable) {
        let nextsec = this.section + 1;
        this.SET_SECTION(nextsec);
        this.displaySection();
      }
    },

    displaySection() {
      // 渲染第section章节
      const sectionInfo = this.book.section(this.section);
      if (sectionInfo && sectionInfo.href) {
        // this.book.rendition.display(sectionInfo.href);
        this.displays(sectionInfo.href);
      }

      // 更新进度条信息
      // this.refreshLocation();
    },
  },
  updated() {
    this.updateProgressBg();
  },
  computed: {
    getTimeText() {
      let txt = this.getTimeByMinites();
      return `已读${txt}分钟`;
    },
  },
};
</script>


<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.setting-wrapper {
  position: absolute;
  bottom: $settingBottom;
  height: $settingHeight;
  left: 0;
  z-index: 200;
  width: 100%;
  background: $color-white;
  box-shadow: $boxShadowUp;

  .setting-progress {
    position: relative;
    width: 100%;
    height: 100%;

    .read-time-wrapper {
      position: absolute;
      left: 0;
      top: 0.8rem;
      width: 100%;
      height: 2rem;
      font-size: 1rem;
      @include center;
    }
    .progress-wrapper {
      width: 100%;
      height: 100%;
      padding: 0 1rem;
      @include center;
      box-sizing: border-box;
      .progress-icon-wrapper {
        cursor: pointer;
        font-size: 1.1rem;
      }
      .progress {
        width: 100%;
        // width: 12rem;
        height: 0.1rem;

        -webkit-appearance: none;
        margin: 0 1rem;
        
        &:focus {
          outline: none;
        }
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 1.2rem;
          width: 1.2rem;
          border-radius: 50%;
          background: $color-white;
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
          border: px2rem(1) solid $color-gray2;
        }
      }
    }
    .text-wrapper {
      position: absolute;
      left: 0;
      bottom: 1rem;
      width: 100%;
      color: $color-gray4;
      font-size: .9rem;
      padding: 0 1.1rem;
      box-sizing: border-box;
      @include center;
      .progress-section-text {
        @include ellipsis;
      }
    }
  }
}
</style>