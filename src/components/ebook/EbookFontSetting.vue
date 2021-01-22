<template>
  <div class="setting-wrapper" v-show="ifTitleAndMenuVisiable && ifSettingVisible === 3">
    <div class="setting-font-size">
      <div class="preview" :style="{ fontSize: fontSizeList[0].fontSize }"> A </div>
      <div class="select" v-for="(item, index) in fontSizeList" :key="index">
        <!-- <div class="line"></div> -->
        <div class="point-wrapper" @click="setFontSize(item)">
          <div class="point" v-show="defaultFontSize === item.fontSize">
            <div class="small-point"></div>
          </div>
        </div>
        <div class="line"></div>
      </div>
      <div class="preview" :style="{ fontSize: fontSizeList[fontSizeList.length - 1].fontSize }"> A </div>
    </div>
    <div class="setting-font-family">
      <div class="font-family-wrapper" @click="setFontFamily"> {{ defaultFontFamily }} </div>
      <div class="font-family-icon">&gt;</div>
    </div>
  </div>
</template>

<script>
import { FONT_SIZE_LIST } from "@/utils/book.js";
import { saveFontSize,getFontSize } from '@/utils/localStorage.js'
export default {
  data() {
    return {
      fontSizeList: FONT_SIZE_LIST,
    };
  },
  methods: {
    setFontSize(val) {
      // 设置字体大小
      this.SET_DEFAULTFONTSIZE(val.fontSize);
      // 采用rendition/theme/fontSize方法设置字体 http://epubjs.org/documentation/0.3/#themesfontsize
      this.book.rendition.themes.fontSize(this.defaultFontSize); 
      saveFontSize(this.fileName,val.fontSize)
    },
    setFontFamily() {
      // 显示字体栏
      this.SET_IFSETTINGFONTVISIBLE(true);

    },
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.setting-wrapper {
  box-shadow: $boxShadowUp;
  position: absolute;
  bottom: $settingBottom;
  height: $settingHeight;
  width: 100%;
  background-color: rgb(206, 206, 206);
  @include vertical;
}

.setting-font-size {
  flex: 1.8;
  @include center;

  .preview {
    flex: 1;
  }
  .select {
     @include verticalCenter;
     position: relative;
    .line {
      height: 0.2rem;
      width: 3rem;
      margin-top: 0.2rem;
    }
    .point-wrapper {
      position: absolute;
      width: 0;
      height: 0.5rem;
      border-left: 0.2rem solid $color-gray2;
      .point {
        position: absolute;
        top: -0.2rem;
        left: -0.5rem;
        border: 0.2rem solid $color-gray2;
        box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.15);
        border-radius: 50%;
        height: 0.7rem;
        width: 0.7rem;
        background-color: $color-white;
        @include center;
        .small-point{
          width: .2rem;
          height: .2rem;
          background-color: black;
          border-radius: 50%;
        }
      }
    }
  }
}

.setting-font-family {
  flex: 1;
  font-size: 0.9rem;
  @include center;
  .font-family-wrapper {
    margin-right: 0.2rem;
  }
}
</style>