<template>
  <transition name="hot-search-move">
    <scroll class="hot-search-wrapper"
            :top="3"
            @onScroll="onScroll"
            ref="scroll">
      <hot-search label="热门搜索"
                  btn="清空"
                  :hotSearch="searchList.hotSearch"></hot-search>
                  
      <div class="line"></div>
      <hot-search label="搜索历史"
                  btn="清空"
                  :hotSearch="searchList.historySearch"></hot-search>
    </scroll>
  </transition>
</template>

<script>
  import Scroll from '../common/Scroll2'
  import HotSearch from './HotSearch'

  export default {
    components: {
      Scroll,
      HotSearch
    },
    data() {
      return {
        searchList: {
          hotSearch: [
            {
              type: 1,
              text: 'Self-Reported Population Health',
              num: '1.8万'
            },
            {
              type: 1,
              text: 'Library and Information Sciences',
              num: '1.1万'
            },
            {
              type: 1,
              text: 'Global Business Strategy',
              num: '1.3万'
            },
            {
              type: 1,
              text: 'Corporate Data Quality',
              num: '1.0万'
            },
            {
              type: 1,
              text: 'Verrechnungspreise',
              num: '3.9万'
            }
          ],
          historySearch: [
            {
              type: 2,
              text: 'Computer Science'
            },
            {
              type: 1,
              text: 'Building the Infrastructure for Cloud Security'
            },
            {
              type: 2,
              text: 'ePub'
            },
            {
              type: 2,
              text: 'api'
            },
            {
              type: 2,
              text: 'Vue.js'
            },
            {
              type: 2,
              text: 'Nginx'
            },
            {
              type: 2,
              text: 'Java'
            },
            {
              type: 2,
              text: 'hdfs'
            },
            {
              type: 2,
              text: 'vuejs'
            },
            {
              type: 2,
              text: 'es6'
            },
            {
              type: 2,
              text: 'Intel'
            },
            {
              type: 1,
              text: 'Pro Git'
            },
            {
              type: 2,
              text: 'imooc'
            },
            {
              type: 2,
              text: 'Education'
            },
            {
              type: 2,
              text: 'Springer'
            },
            {
              type: 2,
              text: 'Environment'
            }
          ]
        }
      }
    },
    methods: {
      onScroll(offsetY) {
        this.setHotSearchOffsetY(offsetY)
      },
      reset() {
        this.$refs.scroll.scrollTo(0, 0)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "@/assets/styles/global.scss";
  .hot-search-wrapper {
    width: 100%;
    height: 100%;
    background: $color-white;
    .line {
      width: 100%;
      height: 0;
      border-top: .1rem solid $color-gray1;
      margin: .5rem 0;
    }
  }
</style>
