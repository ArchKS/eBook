// 书城首页
<template>
  <div class="store-home">
    <search-bar></search-bar>
    <scroll-2 :top="scropllTop" :bottom="0" class="scroll-wrapper">
      <div class="banner-wrapper">
        <img :src="banner" class="banner-img" />
      </div>
      <guess-you-like :data="guessYouLike" class="guess-you-like"> </guess-you-like>
      <recommand :data="recommends"></recommand>
      <featured :data="featured"></featured>
      <div class="category-list-wrapper" v-for="(item,index) in categoryList" :key="index">
        <category-book :data="item"></category-book>
      </div>
      <category :data="categories"></category>
    </scroll-2>

    
    <flap-card class="flap-card" :data="random"></flap-card>
  </div>
</template>

<script>
// Mock放到main中会阻拦epubjs的解析
// import '@/mock' 
import SearchBar from "@/components/home/SearchBar";
import FlapCard from "@/components/home/FlapCard";
import Scroll2 from "@/components/common/Scroll2";
import GuessYouLike from "@/components/home/GuessYouLike"
import Recommand from "@/components/home/Recommand"
import CategoryBook from "@/components/home/CategoryBook"
import Featured from "@/components/home/Featured"
import Category from "@/components/home/Category"

import { home } from "@/api/";


export default {
  data() {
    return {
      scropllTop: 5,
      banner: null, // 封面连接
      random: null, // 随机推荐
      guessYouLike: null, // 猜你喜欢
      categories: null, // 图书分类
      categoryList: null, // 分类列表
      featured: null, // 精选
      recommends: null, // 推荐
      tmp: null,
    };
  },
  components: {
    SearchBar,
    Scroll2,
    FlapCard,
    GuessYouLike,
    Recommand,
    CategoryBook,
    Featured,
    Category
  },
  watch: {
    offsetY(v) {
      if (v > 0) {
        this.scropllTop = 3;
      } else {
        this.scropllTop = 5;
      }
    },
  },
  mounted() {
    // 获取当前随机推荐的图书下标
    home().then((response) => {
      if(response.status !== 200) {
        console.log('response status error!');
        return
      }
      const data = response.data;
      this.random = Math.random() * data.random.length;
      this.random = Math.floor(this.random);
      this.random = data.random[this.random]; // 随机推荐图书shake
      this.banner = data.banner;              // 封面图
      this.guessYouLike = data.guessYouLike; // 猜你喜欢
      this.categories = data.categories;      // 图书分类
      this.categoryList = data.categoryList;  // 分类列表
      this.featured = data.featured;          // 精选
      this.recommends = data.recommend;      // 推荐
      
      // console.log(data);
    });
  },
};
</script>
<style lang='scss' scoped>
 @import "@/assets/styles/global.scss";
.store-home {
  width: 100%;
  height: 100%;
  position: relative;
  .banner-wrapper {
    padding: 0.5rem .5rem;
    height: 12rem;
    box-sizing: border-box;
    width: 100%;
    .banner-img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
