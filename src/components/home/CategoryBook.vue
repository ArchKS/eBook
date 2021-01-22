// 分类图书
<template>
  <div class="recommand">
    <title-view
      :label="labelCatagory"
      :btn="'查看全部'"
      @onClick="next"
    ></title-view>

    <div class="recommand-book-wrapper" v-if="data">
      <div
        class="recommand-item"
        v-for="(item, index) in data.list"
        :key="index"
      >
      <!-- 分类图书暂时不提供跳转 -->
        <!-- <div class="cover-wrapper" @click="showBookDetail(item.fileName,item.categoryText)"> -->
        <div class="cover-wrapper" @click="A(item)">
          <img :src="item.cover" class="cover" />
        </div>
        <div class="item-filename-wrapper">
          <div class="fileName">
            {{ fname(item.fileName) }}
          </div>
        </div>
        <div class="readingNum-wrapper">
          <div class="readers">{{ item.author }}</div>
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
  data() {
    return {};
  },
  computed: {
    labelCatagory() {
      if (this.data !== null) {
        switch (this.data.category) {
          case 1:
            return "计算机科学";
          case 2:
            return "社会科学";
          case 3:
            return "经济学";
          case 4:
            return "教育学";
          case 5:
            return "基础工程";
          case 6:
            return "环境学";
          case 7:
            return "地质学";
          case 8:
            return "历史学";
          case 9:
            return "法律";
          case 10:
            return "生活科学";
          case 11:
            return "文学";
          case 12:
            return "Biomedicine";
          case 13:
            return "BusinessandManagement";
          case 14:
            return "EarthSciences";
          case 15:
            return "MaterialsScience";
          case 16:
            return "Mathematics";
          case 17:
            return "MedicineAndPublicHealth";
          case 18:
            return "Philosophy";
          case 19:
            return "Physics";
          case 20:
            return "PoliticalScienceAndInternationalRelations";
          case 21:
            return "Psychology";
          case 22:
            return "Statistics";
        }
      } else {
        return "图书分类";
      }
    },
  },
  components: {
    TitleView,
  },
  methods: {
    next() {
      console.log("Recommand Have No Book");
    },
    A(item){
      console.log(item);
    }
  },
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.recommand {
  width: 100%;
  padding-top: 1rem;
  .recommand-book-wrapper {
    margin: 1rem 0;
    @include center; 
    box-sizing: border-box;
    .recommand-item {
       @include vertical;
      width: 24%;
      box-sizing: border-box;
      .cover-wrapper {
        .cover {
          width: 5.5rem;
          height: 7.2rem;
        }
      }
      .item-filename-wrapper {
        width: 100%;
        font-weight: bold;
        text-align: left;
        margin-left: .2rem;
        .fileName {
          width: 100%;
          font-size: 1rem;
          line-height: 1.2rem;
          @include ellipsis;
        }
      }
      .readingNum-wrapper {
        margin-left: .2rem;
        text-align: left;
        .readers {
          font-size: 0.5rem;
          @include ellipsis;
          width: 80%;
        }
      }
    }
  }
}
</style>