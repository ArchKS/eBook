// 书架列表中的单个元素组件
<template>
  <div class="shelf-item" :class="{ 'shelf-item-shadow': data.type != 3 }" >
    <component
      :is="item"
      :data="data"
      @click="onItemClick(data)"
      @dragover="itemDragOver"
      @drop="itemDrop"
      :style="{ height: Height }"
    ></component>
    <div
      class="item-title-wrapper"
      
    >
      <div class="title" :class="{ 'category-name': data.type == 2 }">{{ data.title }}</div>
    </div>
    <div
      class="icon-selected"
      :class="{ 'is-selected': data.selected }"
      v-show="isEditMode && data.type === 1"
    ></div>
  </div>
</template>

<script>
import ShelfItemBook from "./shelfItemBook";
import ShelfItemAdd from "./shelfItemAdd";
import ShelfItemCategory from "./shelfItemCategory";
import { saveBookShelfList, getBookShelfList } from "@/utils/localStorage";
import { markRaw } from "vue";

export default {
  props: ["data"],
  components: {
    ShelfItemBook: markRaw(ShelfItemBook),
    ShelfItemAdd: markRaw(ShelfItemAdd),
    ShelfItemCategory: markRaw(ShelfItemCategory),
  },
  data() {
    return {
      book: ShelfItemBook,
      category: ShelfItemCategory,
      add: ShelfItemAdd,
      ifDrag: false,
    };
  },
  computed: {
    item() {
      if (this.data.type === 1) {
        return this.book;
      } else if (this.data.type === 2) {
        return this.category;
      } else {
        return this.add;
      }
    },
  },
  watch: {
    isEditMode(v) {
      this.data.selected = false; // 当编辑状态改变时，将选中状态也取消
    },
  },
  methods: {
    // 对单个书架元素的点击事件
    /* 如果在编辑模式下点击
     * 电子书为普通类型电子书，则点击时将data.selected置为!data.selected
     * 如果当前selected为true，则加入到shelfSelectedList，如果为false，则移出。
     * 电子书类型为分类，则将透明度改为50%
     * 电子书类型为 + ，则没有selected标志
     * 如果在非编辑模式下点击
     * 电子书类型为普通电子书，则跳转到电子书的渲染页面
     * 电子书类型为分类，则暂时不做什么
     * 电子书类型为 + ，则跳转到书城首页
     */
    onItemClick(data) {
      if (this.isEditMode) {
        if (this.data.type == 1) {
          if (typeof this.data.selected === "boolean") {
            this.data.selected = !this.data.selected;
            if (this.data.selected) {
              // 加入书架选择列表
              this.SET_SHELF_SELECTED([...this.shelfSelected, data]);
            } else {
              // 移出书架选择列表
              this.SET_SHELF_SELECTED(
                this.shelfSelected.filter((item) => item.bookId !== data.bookId)
              );
            }
          } else {
            this.data.selected = true;
            // 加入书架选择列表
          }
        }
      } else {
        if (this.data.type == 1) {
          // 是单本电子图书，去详情页
          this.showBookDetail(data.fileName, data.categoryText);
        } else if (this.data.type == 2) {
        } else {
          // 去书城首页
          this.$router.push({
            path: "/store/home",
          });
        }
      }
    },
    makeNewCategory() {
      // 目标图书
      let sourceBook = this.shelfList[this.dragSourceIndex];
      let targetBook = this.shelfList[this.dragTargetIndex];
      // 创建新的category
      let newCategory = {
        title: "新建分组",
        itemList: [sourceBook, targetBook],
        id: targetBook.id,
        selected: false,
        type: 2,
        cache: false,
      };

      // 将新的分组添加到localStorage中
      let localShelfList = getBookShelfList();
      localShelfList[this.dragTargetIndex] = newCategory;
      localShelfList.splice(this.dragSourceIndex, 1);
      saveBookShelfList(localShelfList);
      this.refreshBookShelf();
    },
    addToOldCategory(item) {
      // 将书籍添加到书架
      let localShelfList = getBookShelfList();
      localShelfList[this.dragTargetIndex].itemList.push(
        localShelfList[this.dragSourceIndex]
      );
      localShelfList.splice(this.dragSourceIndex, 1);
      saveBookShelfList(localShelfList);
      this.refreshBookShelf();
    },
    itemDragOver(e) {
      // 拖拽事件
      e.preventDefault();
    },

    itemDrop(e) {
      // 放下时 [target]
      e.preventDefault();

      // 找到target的Index，适用于book，不适用于category
      this.shelfList.forEach((item, index) => {
        // 如果bookId存在
        if (item.title && item.title === this.data.title) {
          this.setDragTargetIndex(index);
        }
      });

      // 检测获取到的target的下标是否合法
      if (this.dragTargetIndex !== this.dragSourceIndex) {
      } else {
        console.log("dragTargetIndex Error");
        return;
      }

      switch (this.shelfList[this.dragTargetIndex].type) {
        case 1:
          this.makeNewCategory();
          break;
        case 2:
          this.addToOldCategory();
          break;
        default:
          console.log("miss");
      }
    },
  },
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.shelf-item {
  width: 100%;
  height: 100%;
  position: relative;
  
  .drag-border {
    border: 1px solid red;
  }

  .item-title-wrapper {
    margin-top: 0.3rem;
    font-size: 1rem;
    line-height: 1rem;
    text-align: left;
    height: 2rem;
    @include ellipseWithLine(2);
    
  }
  .icon-selected {
    position: absolute;
    bottom: 0.1rem;
    right: 0.1rem;
    font-size: 1.4rem;
    &.is-selected {
      color: $color-blue2;
    }
  }
}
.shelf-item-shadow {
  box-shadow: 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.2);
}
.category-name {
  @include center;
}
</style>
