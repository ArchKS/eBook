<template>
  <transition name="fade">
    <div
      class="slide-content-wrapper"
      v-if="ifTitleAndMenuVisiable && ifSettingVisible === 0"
    >
      <transition name="slide">
        <div class="content" v-if="ifSettingVisible === 0">
          <div class="content-page-wrapper" v-if="bookAvailable">
            <div class="content-page">
              <component
                :is="currentTab === 1 ? content : bookmark"
              ></component>
            </div>
            <div class="content-page-tab">
              <div
                class="content-page-tab-item"
                :class="{ selected: currentTab === 1 }"
                @click="selectTab(1)"
              >
                目录
              </div>
              <div
                class="content-page-tab-item"
                :class="{ selected: currentTab === 2 }"
                @click="selectTab(2)"
              >
                书签
              </div>
            </div>
          </div>
          <div class="content-empty" v-else>
            <ebook-loading></ebook-loading>
          </div>
        </div>
      </transition>
      <div class="content-bg" @click="hide()"></div>
    </div>
  </transition>
</template>

<script>
import EbookBookContent from "./EbookSlideContent";
import EbookSlideBookmark from "./EbookSlideBookmark";
import EbookLoading from "./EbookLoading";
export default {
  data() {
    return {
      currentTab: 1, // 1表示目录被选中，2表示书签被选中
      content: EbookBookContent,
      bookmark: EbookSlideBookmark,
    };
  },
  methods: {
    hide() {
      // this.TOGGLE_TITLEANDMENUVISIABLE(false);
      this.SET_SETTINGVISIBLE(-1);
    },
    selectTab(tab) {
      this.currentTab = tab;
    },
  },
  components: {
    EbookLoading,
    EbookBookContent,
    EbookSlideBookmark,
  },
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.slide-content-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 300;
}

.content {
  width: 85%;
  .content-page-wrapper {
    @include vertical;
    width: 100%;
    height: 100%;
    .content-page {
      flex: 2.5;
      width: 100%;
    }
    .content-page-tab {
      flex: 0.2;
      height: 100%;
      display: flex;

      .content-page-tab-item {
        flex: 1;
        @include center;
        box-shadow: 0 -0.1rem 0.1rem rgba(0, 0, 0, 0.15);
        box-sizing: border-box;
      }
      .selected {
        font-weight: bold;
      }
    }
  }
  .content-empty {
    width: 100%;
    height: 100%;
    @include center;
  }
}

.content-bg {
  width: 15%;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave {
  transform: translateX(0);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s linear;
}
</style>