// 反转卡片
<template>
  <div class="flap-card" v-if="flapCardVisible">
    <div class="flap-card-bg" v-if="ifLoadVisible">
      <div class="loading-wrapper" v-show="ifLoadVisible">
        <loading :color1="'#feee7d'" :color2="'#6AAFE6'"></loading>
      </div>
    </div>

    <div class="book-card" v-show="ifRecomandVisible">
      <div class="book-cover-wrapper">
        <img class="book-cover" :src="data.cover" />
      </div>
      <div class="book-name-wrapper">
        <div class="book-name">{{ data.fileName }}</div>
        <div class="author-name">{{ data.author }}</div>
      </div>
      <div
        class="read-btn"
        @click="showBookDetail(data.fileName, data.categoryText)"
      >
        立即阅读
      </div>
    </div>

    <div class="close-btn-wrapper" @click="close">
      <div class="icon-close"></div>
    </div>
  </div>
</template>

<script>
import Loading from "../ebook/EbookLoading";
export default {
  props: {
    data: Object,
  },
  data() {
    return {
      ifLoadVisible: true,
      ifRecomandVisible: false,
      loadingTime: 2000,
      task: null,
    };
  },
  watch: {
    flapCardVisible(v) {
      // 如果用户点了shake按钮
      // 1. 初始化
      if (v) {
        this.showAnimated();
      }
    },
  },
  methods: {
    close() {
      this.closeAnimated();
    },
    showbg() {
      this.SET_FLAP_CARD_VISIBLE(true);
    },
    hidebg() {
      this.SET_FLAP_CARD_VISIBLE(false);
    },
    showAnimated() {
      // 加载动画ns后，关闭加载动画，打开推荐图书
      this.task = setTimeout(() => {
        this.ifLoadVisible = false;
        this.ifRecomandVisible = true;
      }, this.loadingTime);
    },
    closeAnimated() {
      // 关闭动画
      // 将加载动画置为true，便于下一次加载
      // 将推荐图书置为false
      // 清除定时任务
      // 将FlapCard置为False
      this.ifRecomandVisible = false;
      this.ifLoadVisible = true;
      if (this.task) {
        clearTimeout(this.task);
        this.task = null;
      }
      this.hidebg();
    },
  },
  components: {
    Loading,
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.flap-card {
  background-color: $color-gray2;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.6);
  @include center;
  @include absCenter;
  .flap-card-bg {
    width: 7rem;
    height: 7rem;
    border-radius: 1rem;
    @include center;
    position: relative;
    .loading-wrapper {
      @include absCenter;
      transform: translate(45%, 45%);
    }
  }
  .book-card {
    width: 16rem;
    height: 18rem;
    position: relative;
    @include verticalCenter;
    background-color: $color-white;
    border-radius: 1rem;
    overflow: hidden;
    line-height: 1rem;

    .book-cover-wrapper {
      position: absolute;
      bottom: 6.9rem;
      width: 80%;
      left: 50%;
      transform: translateX(-50%);
      padding: 1.5rem 0 0.4rem 0;
      .book-cover {
        height: 8.6rem;
        width: 6rem;
      }
    }

    .book-name-wrapper {
      position: absolute;
      bottom: 3.5rem;
      width: 80%;
      @include ellipsis;
      left: 50%;
      transform: translateX(-50%);
      .book-name {
        font-size: 1.2rem;
        padding: 0.2rem 0 0.5rem 0 0;
        font-weight: bold;
      }
      .author-name {
        font-size: 1rem;
        padding: 0.5rem 0 0.3rem 0;
        color: $color-gray5;
      }
    }

    .read-btn {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 1rem;
      padding: 1rem 0;
      background-color: $color-blue;
    }
  }
  .close-btn-wrapper {
    position: absolute;
    bottom: 3rem;
    color: $color-white;
    font-size: 2rem;
    border-radius: 50%;
    background: $color-gray4;
    padding: 0.6rem;
    @include center;
  }
}
</style>