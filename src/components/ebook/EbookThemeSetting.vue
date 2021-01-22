<template>
  <div
    class="setting-wrapper"
    v-show="ifTitleAndMenuVisiable && ifSettingVisible === 2"
  >
    <div class="setting-theme">
      <div
        class="setting-theme-item"
        v-for="(item, index) in themeList"
        :key="index"
        @click="setTheme(index)"
      >
        <div
          class="preview"
          :class="{ selected: item.name === defaultTheme }"
          :style="{ background: item.style.body.background }"
        ></div>
        <div class="text" :class="{ selected: item.name === defaultTheme }">
          {{ item.alias }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { themeList,removeAllCss } from "@/utils/book.js";
import { getTheme, saveTheme } from "@/utils/localStorage.js";

export default {
  methods: {
    setTheme(index) {
      const theme = this.themeList[index];
      this.SET_DEFAULTTHEME(theme.name);
      this.book.rendition.themes.select(this.defaultTheme);
      console.log(this.defaultTheme);
      removeAllCss()
      this.initGlobalCss();
      saveTheme(this.fileName, theme.name);
    },
  },
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";

.setting-wrapper {
  width: 100%;
  bottom: $settingBottom;
  height: $settingHeight;
  box-shadow: $boxShadowUp;
  position: absolute;
  z-index: 200;
  background-color: $color-white;
  .setting-theme {
    margin-top: 0.6rem;
    height: 80%;
    display: flex;
    .setting-theme-item {
      flex: 1;
      @include vertical;
      padding: 0.13rem;
      box-sizing: border-box;
      .preview {
        flex: 1;
        border: 0.13rem solid $color-gray2;
        box-sizing: border-box;
        &.selected {
          box-shadow: 0 0.2rem 0.3rem 0 rgba(0, 0, 0, 0.1);
        }
      }
      .text {
        flex: 0 0 0.17rem;
        font-size: 0.13rem;
        color: $color-gray2;
        margin-top: .5rem;
        @include center;
        &.selected {
          color: $color-gray4;
        }
      }
    }
  }
}
</style>