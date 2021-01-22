// 总体分类
<template>
  <div class="categories">
    <title-view :label="'分类'" :btn="'查看全部'" @onClick="next"></title-view>
    <div class="categories-wrapper">
      <div class="category-item" v-for="(item, index) in data" :key="index">
        <div class="left">
          <div class="categoryNum">{{ categoryToChinese(item.category) }}</div>
          <div class="bookNums">{{ item.num }}本书</div>
        </div>
        <div class="right">
          <img :src="item.img1" class="image1" />
          <img :src="item.img2" class="image2" />
        </div>
      </div>
    </div>
    <toast :text="text" v-if="ifClick"></toast>
  </div>
</template>
<script>
import TitleView from "./TitleView";
export default {
  props: {
    data: Object,
  },
  components: {
    TitleView,
  },
  methods: {
   next() {
     
    },
  },
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.categories {
  .categories-wrapper {
    padding: 1.3rem 0.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, 50%);

    .category-item {
      background-color: $color-gray1;
      width: 11.5rem;
      height: 6.6rem;
      margin: 0.3rem;
      display: grid;
      grid-template-columns: 60% 40%;

      .left {
        @include verticalCenter;
        .categoryNum {
          font-weight: bold;
          font-size: 1.1rem;
        }
        .bookNums {
          padding: 0.4rem 0;
        }
      }
      .right {
        position: relative;
        margin-right: 1rem;
        .image1 {
          @include absCenter;
          z-index: 100;
          width: 3rem;
          height: 4.5rem;
        }

        .image2 {
          @include absCenter; 
          transform: translate(5%, -50%);
          width: 2rem;
          height: 3rem;
        }
      }
    }
  }
}
</style>

