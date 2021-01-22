<template>
  <div class="menu-wrapper" v-show="ifTitleAndMenuVisiable">
    <div class="icon-wrapper">
      <span @click="menuSetting(0)" class="icon-menu"></span>
    </div>
    <div class="icon-wrapper">
      <span @click="menuSetting(1)" class="icon-progress"></span>
    </div>
    <div class="icon-wrapper">
      <span @click="menuSetting(2)" class="icon-bright"></span>
    </div>
    <div class="icon-wrapper">
      <span @click="menuSetting(3)" class="icon-A"></span>
    </div>
    <ebook-font-setting></ebook-font-setting>
  </div>
</template>

<script>
import EbookFontSetting from "./EbookFontSetting";
export default {
  methods: {
    // 控制菜单栏对应设置的隐藏和显示
    menuSetting(val) {
      this.SET_SETTINGVISIBLE(val);
    },
  },
  components: {
    EbookFontSetting,
  },
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.menu-wrapper {
  height: 3rem;
  width: 100%;

  position: absolute;
  bottom: 0;
  @include twoSideWidthGap;
  
  box-shadow: 0 -0.5rem 0.5rem rgba(0, 0, 0, 0.15);
  z-index: 200;
  
  font-size: 2rem;

  background-color: $color-white;
}
</style>