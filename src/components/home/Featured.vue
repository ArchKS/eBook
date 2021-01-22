// 精选 
<template>
  <div class="featured">
    <title-view :label="'精选'" :btn="'查看全部'" @onClick="next"></title-view>

    <div class="featured-wrapper">
      <div class="featured-item" v-for="(item, index) in data" :key="index">
        <div class="book-cover" @click="showBookDetail(item.fileName,item.categoryText)">
          <img class="cover" :src="item.cover" />
        </div>
        <div class="right">
          <div class="book-name">
            <div class="name">{{ shrinkName(item.title) }}</div>
          </div>
          <div class="book-author">
            <div class="author">{{ item.author }}</div>
          </div>
          <div class="book-category">
            <div class="category">{{ item.categoryText }}</div>
          </div>
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
      console.log("Recommand Have No Book");
    },
    shrinkName(name) {
      if (name.length > 15) {
        return name.slice(0, 15);
      } else {
        return name;
      }
    },
  },

};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.featured {
  padding-top: 1rem;
  .featured-wrapper {
    height: 23rem;
    padding: 1.5rem 1rem 0 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, 50%);
    grid-template-rows: repeat(auto-fill, 8rem);

    .featured-item {
      position: relative;

      .book-cover {
        position: absolute;
        top: 0;
        left: 0;
        .cover {
          width: 4.8rem;
          height: 6.5rem;
        }
      }
      .right {
        position: absolute;
        top: 0.3rem;
        left: 5rem;
        .book-name {
          .name {
            text-align: left;
            width: 6rem;
            font-size: 1rem;
            position: absolute;
            top: 0;
            left: 0;
            word-break: break-all;
            font-weight: bold;
          }
        }
        .book-author {
          position: absolute;
          top: 3rem;
          left: 0;
          height: 1rem;
          line-height: 1rem;
          color: rgba(0, 0, 0, 0.5);
          width: 6rem;
          .author {
            width: 80%;
            @include ellipsis;
          }
        }
        .book-category {
          position: absolute;
          top: 5rem;
          left: 0;
          height: 1rem;
          color: rgba(0, 0, 0, 0.5);
          line-height: 1rem;
          width: 6rem;
          .category {
            @include ellipsis;
          }
        }
      }
    }
  }
}
</style>

