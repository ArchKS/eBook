// 详情页的页脚
<template>
  <div class="detail-foot-wrapper">
    <div class="detail-footer" :class="{ 'show-shadow': !ifDownloadProgress }">
      <div class="read" @click="read">阅读</div>

      <div class="cache" v-if="!ifCache" @click="saveCache">缓存书籍</div>
      <div class="cache" v-else @click="delCache">删除缓存</div>

      <div class="shelf" @click="remove" v-if="ifBookAddToShelf">
        已加入书架
      </div>
      <div class="shelf" @click="add" v-else>加入书架</div>
    </div>
    <div class="line-progress-wrapper" v-if="ifDownloadProgress">
      <line-progress :width="percent" :color2="color2"></line-progress>
    </div>
    <transition name="toast">
      <toast :text="text" :ifPersistence="false" v-if="ifToast"></toast>
    </transition>
  </div>
</template>

<script>
import { getBookShelfList } from "@/utils/localStorage";
import LineProgress from "@/components/common/lineProgress";
import { removeLocalForage } from "@/utils/localForage";
import { download } from "@/api/";
// import '@/mock'
import Toast from "@/components/common/Toast";
export default {
  props: ["bkdetail"],
  data() {
    return {
      ifDownloadProgress: false,
      percent: 0,
      // shelfBkIndex: -1, // 当前图书在书架中的下标,所有的操作都直接操作vuex中的shelfList
      animateTime: 2500,
      color2: "#DC1B42",
      flatBookIndex: -1, // no use
      ifToast: false,
      text: '<p>请先加入到书架</p>'
    };
  },
  computed: {
    ifBookAddToShelf() {
      // 只能判断1级分组
      this.refreshBookShelf(); // 用localStorage刷新vuex
      for (let i = 0; i < this.shelfList.length; i++) {
        if (this.shelfList[i].bookId == this.bkdetail.bookId) {
          this.setShelfBkIndex(i);
          return true; // 已经存在书架中
        }
      }
      return false;
    },
    ifCache() {
      /* 
        1. 当前图书必须在书架中
        2. 获取当前图书在书架中的下标
        3. 判断是否缓存过
       */
      // console.log(this.shelfList);
      if (this.shelfBkIndex < 0) return false;
      try {
        let ifCache = this.shelfList[this.shelfBkIndex].cache;
        if (ifCache == true) return true;
        return false;
      } catch (e) {
        return false;
      }
    },
  },
  components: {
    LineProgress,
    Toast
  },
  methods: {
    add() {
      let book = JSON.parse(JSON.stringify(this.bkdetail));
      book.type = 1;
      this.addToBookShelf(book);
    },
    remove() {
      let bookTitle = this.bkdetail.title;
      this.removeFromBookShelf(bookTitle);
    },
    read() {
      // 跳转到阅读器
      let category = this.$route.query.category;
      let filename = this.$route.query.filename;
      this.showEbook(filename, category);
      //
    },
    saveCache() {
      // 如果不再书架中，则不能缓存
      console.log(this.shelfBkIndex);
      if (this.shelfBkIndex < 0){
        this.ifToast = true;
        setTimeout(()=>{
           this.ifToast = false;
        },2000)
        return 
      }
      
      this.ifDownloadProgress = true;
      download(
        this.bkdetail,
        (res) => {
          /* 下载blob电子书文件成功
           * 将缓存写入到indexDB
           * 同步数据到vuex和localStorage
           */
          // 1. 关闭进度条效果
          this.ifDownloadProgress = false;
          // 2. 将缓存标志位置为true
          this.shelfList[this.shelfBkIndex].cache = true; // **********
          // 3. 刷新vuex和localStorage
          this.refreshLocalStorage(this.shelfList);
          // 4. 打开动画效果
          this.setIfTickVisible(true);
          // 5. 关闭动画效果
          setTimeout(() => {
            this.setIfTickVisible(false);
            this.percent = 0;
          }, this.animateTime);
        },
        (pgs) => {
          this.percent = Math.ceil((pgs.loaded / pgs.total) * 100);
        },
        (err) => {
          console.log("err:", err);
        }
      );
    },
    delCache() {
      this.ifDownloadProgress = true;
      this.setIfTickVisible(true);
      // 放在外面不做延时，为了之后的dialog里的文本信息是正确的
      this.shelfList[this.shelfBkIndex].cache = false;

      setTimeout(() => {
        // 1. 进度条动画
        this.ifDownloadProgress = false;
        // 2. 从数据库中删除cache
        removeLocalForage(this.shelfList[this.shelfBkIndex].fileName);
        // 3. 同步到Vuex和localStorage
        this.refreshLocalStorage(this.shelfList);

        // 4. 关闭打勾的动画效果
        this.setIfTickVisible(false);
      }, this.animateTime);
    },
  },
  created() {
    let info = `ifBookAddToShelf: ${this.ifBookAddToShelf} ; shelfBkIndex : ${this.shelfBkIndex}`;
    console.log(info);
  },
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.detail-footer {
  position: fixed;
  @include twoSide; 

  bottom: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  
  font-size: 1rem;
  font-weight: bold;

  background-color: $color-white;
  color: $color-blue;

  &.show-shadow {
    box-shadow: 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.3);
  }
  .read {
    flex: 1;
    font-size: 1.1rem;
  }
  .cache {
    flex: 1;
  }
  .shelf {
    flex: 1;
  }
}
.line-progress-wrapper {
  width: 100%;
  height: 0.3rem;
  left: 0;
  bottom: 3rem;
  position: absolute;
}
</style>