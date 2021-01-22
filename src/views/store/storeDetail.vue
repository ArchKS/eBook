<template>
  <div class="store-detail">
    <detail-title></detail-title>

    <div class="book-info">
      <div class="book-info-left">
        <div class="book-cover">
          <img :src="bkdetail.cover" class="cover" />
        </div>
      </div>
      <div class="book-info-right">
        <div class="book-name">
          {{ bkdetail.title }}
        </div>
        <div class="book-author">
          {{ bkdetail.author }}
        </div>
        <div class="book-read">已读：{{ readTimes }} 分钟</div>
      </div>
    </div>

    <div class="line-wrapper">
      <div class="line"></div>
    </div>

    <div class="publish-info">
      <div class="row">
        <div class="label">出版社</div>
        <div class="publisher">{{ shrink(bkdetail.publisher) }}</div>
      </div>
      <div class="row">
        <div class="label">语言</div>
        <div class="language">{{ lang(bkdetail.language) }}</div>
      </div>

      <div class="row">
        <div class="label">分类</div>
        <div class="category">
          {{ categoryToChinese(bkdetail.category) }}
        </div>
      </div>
      <!-- <div class="isbn">ISBN：</div> -->
    </div>

    <div class="line-wrapper">
      <div class="line"></div>
    </div>

    <detail-footer :bkdetail="bkdetail"></detail-footer>

    <tick class="tick" :dialog="dialog"></tick>
  </div>
</template>

<script>
import { detail } from "@/api/";
import { getReadTime } from "@/utils/localStorage";
import detailTitle from "@/components/detail/detailTitle";
import detailFooter from "@/components/detail/footer";
import Tick from "@/components/common/Tick.vue";
export default {
  data() {
    return {
      bkdetail: -1,
    };
  },
  components: {
    detailTitle,
    detailFooter,
    Tick,
  },
  computed: {
    readTimes() {
      let fileName = this.$route.query.filename;
      let category = this.$route.query.category;
      let fileUrl = `${process.env.VUE_APP_RES_URL}/${category}/${fileName}.epub`;
      let readTime = getReadTime(fileUrl);
      if (!readTime) {
        return 0;
      } else {
        return Math.ceil(readTime / 60);
      }
    },
    dialog() {
      if (this.shelfBkIndex < 0) return "不在书架当中";
      try {
        let ifCache = this.shelfList[this.shelfBkIndex].cache;
        if (ifCache === false) {
          return "删除缓存成功";
        } else {
          return "缓存成功";
        }
      } catch (e) {
        return "SUCCESS";
      }
      return "SUCCESS";
    },
  },
  methods: {
    getData() {
      // 获取路由中的文件名
      let fileName = this.$route.query.filename;
      detail(fileName).then((res) => {
        this.bkdetail = res.data.data;
      });
    },
    shrink(txt) {
      if (txt && txt.length >= 20) {
        return txt.substring(0, 20);
      } else {
        return txt;
      }
    },
    init() {
      this.getData();
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang='scss' scoped>
 @import "@/assets/styles/global.scss";
.store-detail {
  width: 100%;
  height: 100%;
  position: absolute;
  .book-info {
    padding: 3rem 1rem;
    display: flex;
    .book-info-left {
      flex: 1;
      .book-cover {
        .cover {
          height: 9rem;
          width: 6rem;
        }
      }
    }
    .book-info-right {
      flex: 2;
      text-align: left;
      @include columnBetween;
      margin: 1rem 0.5rem;
      .book-name {
        padding: 0 0 0.5rem 0;
        font-weight: bold;
        font-size: 1.2rem;
      }
      .book-author {
        font-size: 0.8rem;
        padding: 0 0 0.4rem 0;
        color: $color-blue;
      }
      .book-read {
        font-size: 0.8rem;
      }
    }
  }
  
  .line-wrapper {
    width: 100%;
    height: 1px;
    @include center;
    .line {
      width: 90%;
      height: 1px;
      background-color: $color-gray2;
    }
  }

  .publish-info {
    font-size: 1rem;
    margin: 3rem 2rem;
    width: 100%;
    text-align: left;
    font-size: 1.1rem;
    @include vertical;
    .row {
      padding: 0.5rem 0 0 0;
      display: flex;
    }

    .label {
      width: 5rem;
      height: 2rem;
    }
  }
  .tick {
    position: absolute;
    left: 50%;
    bottom: 10%;
    transform: translateX(-50%);
  }
}
</style>

