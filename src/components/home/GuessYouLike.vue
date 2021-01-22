// 猜你喜欢
<template>
  <div class="guess-you-like">
    <title-view :label="'猜你喜欢'" :btn="'换一批'" @onClick="next" class="title"></title-view>
    <div class="guess-book-wrapper">
      <div class="guess-item" v-for="(item, index) in sliceGroup" :key="index">
        <div class="book-cover-wrapper" @click="showBookDetail(item.fileName,item.categoryText)">
          <img class="book-cover" :src="item.cover">
        </div>
<div class="info-wrapper">
          <div class="item-fileName-wrapper">
          <div class="item-fileName">{{ fname(item.fileName) }}</div>
        </div>
        <div class="item-author-wrapper">
          <div class="item-author"> {{ item.author }} </div>
        </div>
        <div class="item-publish-wrapper">
          <div class="item-publisher"> {{ item.publisher }} </div>
        </div>
</div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleView from "./TitleView";
export default {
  data() {
    return {
      startIndex: 0,
    };
  },
  components: {
    TitleView,
  },
  props: {
    data: Object,
  },
  computed: {
    sliceGroup() {
      if (this.data) {
        return this.data.filter((item,index)=>{
          if(index<=this.startIndex+2 && index >= this.startIndex){
            return item;
          }
        });
      }
    },
  },
  methods: {
    next() {
      this.startIndex = ( this.startIndex + 3 ) % 9;
    },
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.guess-you-like {
  width: 100%;
  @include vertical; 

  .title{
    flex: 1;
    width: 100%;
  }

  .guess-book-wrapper{
    flex: 10;
    width: 100%;
    height: 100%;
 
    .guess-item{
      font-size: 2rem;
      width: 100%;
      @include left; 
      padding: .8rem 0;
      .book-cover-wrapper{
        padding: .3rem 0.6rem;
        .book-cover{
          width: 4.5rem;
          height: 5.5rem;
        }
      }
      .info-wrapper{
        width: 70%;
        @include vertical;
        align-items: flex-start;

        text-align: left;
      .item-fileName-wrapper{
        font-size: 1.1rem;
        font-weight: bold;
        padding: 0 0 .5rem 0;
        line-height: 1.2rem;
        word-break: break-all;
        white-space: normal;
        vertical-align: right;
      }
      .item-author-wrapper{
        line-height: 1.2rem;
        font-size: .9rem;
        padding: .1rem 0;
        width: 75%;
        .item-author{
       @include ellipsis;

        }
      }
      .item-publish-wrapper{
        font-size: .9rem;
        line-height: 1.2rem;
        padding: .1rem 0;
        .item-publisher{
          @include ellipsis;
        }
      }
      }
    }
  }
}
</style>