<template>
  <div
    class="ebook-popup-list"
    v-show="ifTitleAndMenuVisiable && ifSettingFontFamilyVisible"
  >
    <div class="set-font-family-title">
      <div class="title-icon" @click="hide">
        <span class="icon-down2"></span>
      </div>
      <div class="title-text"> 选择字体 </div>
    </div>
    <div
      class="set-font-family-wrapper"
      v-for="(item, index) in font_family_list"
      :key="index"
      @click="select(item.fontFamily)"
      :class="{ selected: defaultFontFamily === item.fontFamily }"
    >
      <div class="font-family-list">
        {{ item.fontFamily }}
      </div>
      <div
        class="font-family-checked"
        v-show="defaultFontFamily === item.fontFamily"
      >
        <span class="icon-check"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { FONT_FAMILY_LIST } from "@/utils/book";
import { saveFontFamily } from "@/utils/localStorage";

export default {
  data() {
    return {
      font_family_list: FONT_FAMILY_LIST,
    };
  },
  methods: {
    hide() {
      this.SET_IFSETTINGFONTVISIBLE(false);
    },
    select(font) {
      this.SET_DEFAULTFONTFAMILY(font);
      saveFontFamily(this.fileName,font);
      if (font === "Default") {
        this.book.rendition.themes.font("Times New Roman");
      } else {
        this.book.rendition.themes.font(this.defaultFontFamily);
      }
      console.log(this.defaultFontFamily);
    },
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.ebook-popup-list {
  box-shadow: 0 -0.5rem 0.5rem rgba(0, 0, 0, 0.15);
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 0rem;
  background-color: rgb(206, 206, 206);
  z-index: 200;
}
.set-font-family-wrapper {
  display: flex;
  font-size: 1rem;
  padding: 0.7rem;

  .font-family-list {
    flex: 1;
    text-align: left;
  }
  .font-family-checked {
    flex: 1;
    text-align: right;
  }
}

.set-font-family-title {
  @include center;

  font-size: 1.1rem;
  font-weight: bold;
  
  width: 100%;
  height: 3rem;
  
  position: relative;
  border-bottom: 1px solid $color-gray2;

  .title-icon {
    position: absolute;
    width: 1rem;
    height: 1rem;
    left: 1rem;
  }
  .title-text {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  }
}

.selected {
  color: blue;
  font-weight: bold;
}
</style>