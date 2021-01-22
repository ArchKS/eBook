<template>
  <div>
    <div
      class="blur-bg-wrapper"
      v-if="ifCategoryVisible"
      @click="hideCategory"
      @dragover="bgDragOver"
      @drop="bgDrop"
    >
      <div class="category-title-wrapper" @click="editCategoryTitle">
        <input
          type="text"
          class="edit-title"
          v-model="cTitle"
          v-if="ifCategoryTitleEdit"
        />
        <div class="show-title" v-else>
          {{ cTitle }}
        </div>
      </div>

      <div class="category-list-wrapper" @click="visibleArea">
        <div class="scroll-wrapper">
          <div
            class="book-item"
            v-for="(item, index) in itemList"
            :key="index"
            :style="{ height: Height }"
          >
            <div
              class="cover-wrapper"
              @click="showBookDetail(item.fileName, item.categoryText)"
            >
              <img
                :src="item.cover"
                class="cover-item"
                @dragstart="imgDragStart(index)"
                draggable="true"
              />
            </div>
            <div class="title-wrapper">
              <div class="title">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import scroll from "../common/Scroll2";
import { saveBookShelfList, getBookShelfList } from "@/utils/localStorage";

export default {
  data() {
    return {
      cTitle: "新建分组", // category的title
      cData: -1, // category的data
      //   categoryTextTitle: "", // 编辑的title的text
      localIndex: -1, // category在localStorage中的下标
      dragItemIndex: -1, // 拖拽的元素
    };
  },
  computed: {
    itemList() {
      if (this.cData.itemList && this.cData.itemList.length > 0) {
        return this.cData.itemList;
      } else {
        return [];
      }
    },
  },
  methods: {
    initData() {
      // 获取localStorage中的内容
      let localBook = getBookShelfList();
      localBook.forEach((item, index) => {
        if (item.title === this.categoryData.title && item.type === 2) {
          this.cData = item;
          this.cTitle = item.title;
          this.localIndex = index;
        }
      });
    },
    hideCategory() {
      // 如果点击的时候标题处于编辑模式，则先退出编辑模式,保存修改的分组名
      // 否则就退出分类
      if (this.ifCategoryTitleEdit === true) {
        this.setIfCategoryTitleEdit(false);
        let localBook = getBookShelfList();
        localBook[this.localIndex]["title"] = this.cTitle;
        this.refreshLocalStorage(localBook);
      } else {
        this.setIfCategoryVisible(false);
        this.setCategoryData(-1);
        this.$router.push({ path: "/store/shelf" });
        let shelfList = this.ifAddIsExit("", true);
      }
    },
    visibleArea(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    editCategoryTitle(e) {
      // 修改分组标题
      e.preventDefault();
      e.stopPropagation();
      if (this.ifCategoryTitleEdit === false) {
        this.setIfCategoryTitleEdit(true);
      } else {
        // this.setIfCategoryTitleEdit(false);
      }
    },
    bgDragOver(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    bgDrop(e) {
      e.preventDefault();
      // 判断在背景处释放，背景处没有该class
      if (e.path.every((item) => item.className !== "scroll-wrapper")) {
        // 获取localStorage中的值bookList
        // 删除其中的category中的itemList的第dragItemIndex个元素
        // 在booklist后添加该值
        let bookList = getBookShelfList();
        let dragBook = bookList[this.localIndex].itemList[this.dragItemIndex];
        bookList.push(dragBook);
        bookList[this.localIndex].itemList.splice(this.dragItemIndex, 1);
        this.refreshLocalStorage(bookList);
        this.initData();
      }
    },
    imgDragStart(index) {
      this.dragItemIndex = index;
    },
  },
  created() {
    //   如果vuex中内容为空，则直接跳转到shelf
    if (typeof this.categoryData !== "object") {
      this.$router.push({ path: "/store/shelf" });
    } else {
      this.initData();
    }
  },
  unmounted() {
    let bookList = getBookShelfList();
    bookList = bookList.filter((item) => {
      if (item.type !== 2) {
        return item;
      } else {
        if (item.itemList.length > 0) {
          return item;
        }
      }
    });
    this.refreshLocalStorage(bookList);
  },
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.blur-bg-wrapper {
  width: 100%;
  height: 100%;
  background-color: $color-gray1;
  position: absolute;
  z-index: 100;
  @include center;

  .category-title-wrapper {
    position: absolute;
    width: 12rem;
    height: 2.4rem;
    top: 7%;
    left: 50%;
    transform: translateX(-50%);
    background-color: $color-gray2;
    backdrop-filter: saturate(180%) blur(4rem);
    @include center;
    .edit-title {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
    }
    .show-title {
      width: 100%;
      height: 100%;
      @include center;
    }
  }

  .category-list-wrapper {
    width: 100%;
    .scroll-wrapper {
      width: 100%;
      height: 24rem;
      background-color: $color-white;
      z-index: 200;
      display: flex;
      flex-flow: row wrap;
      padding: 0.5rem 1rem;
      overflow-y: scroll;
      box-sizing: border-box;
      &::-webkit-scrollbar {
        width: 0;
      }

      .book-item {
        width: 33.33%;
        padding: 0.5rem 1rem 0.5rem 1rem;
        margin: 0.5rem 0 0.8rem 0;
        @include vertical;

        box-sizing: border-box;

        .cover-wrapper {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          .cover-item {
            width: 100%;
            box-sizing: border-box;
          }
        }
        .title-wrapper {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          .title {
            font-size: 0.8rem;
            line-height: 1rem;
            color: $color-black;
            background-color: $color-white;

            font-weight: normal;
            text-align: left;

            @include ellipseWithLine(2);
          }
        }
      }
    }
  }
}
</style>


