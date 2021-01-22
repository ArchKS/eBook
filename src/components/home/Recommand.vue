// 热门推荐
<template>
  <div class="recommand">
    <title-view
      :label="'热门推荐'"
      :btn="'查看全部'"
      @onClick="next"
    ></title-view>

    <div class="recommand-book-wrapper">
      <div class="recommand-item" v-for="(item, index) in data" :key="index">
        <div
          class="cover-wrapper"
          @click="showBookDetail(item.fileName, item.categoryText)"
        >
          <img :src="item.cover" class="cover" />
        </div>
        <div class="item-filename-wrapper">
          <div class="fileName">
            {{ fname(item.fileName) }}
          </div>
        </div>
        <div class="readingNum-wrapper">
          <div class="readers">{{ item.readers }}同时在读</div>
        </div>
      </div>
    </div>
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
      console.log('HaveNotRealized ');
    },
  },
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.recommand {
  width: 100%;
  .recommand-book-wrapper {
    margin: 1rem 0;
    @include center;
    .recommand-item {
      flex: 1;
      @include vertical;
      width: 33%;
      .cover-wrapper {
        .cover {
          width: 6rem;
          height: 8rem;
        }
      }
      .item-filename-wrapper {
        width: 80%;
        font-size: 1rem;
        line-height: 1.2rem;
        font-weight: bold;
        padding: 0.3rem 0.2rem 0.5rem 0.8rem;
        @include center;
        .fileName {
          word-break: break-all;
        }
      }
      .readingNum-wrapper {
        .readers {
          font-size: 0.5rem;
        }
      }
    }
  }
}
</style>