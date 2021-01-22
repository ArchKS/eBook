<template>
  <div class="shelf-item-book">
    <img
      :src="data.cover"
      class="shelf-item-book-cover"
      draggable="true"
      @dragstart="imgDragStart"
    />
  </div>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    imgDragStart(e) {
      // source
      this.shelfList.forEach((item, index) => {
        if (item.bookId == this.data.bookId) {
          this.setDragSourceIndex(index);
        //   console.log("this.dragSourceIndex: ", this.dragSourceIndex);
        }
      });
    },
  },
};
</script>
<style lang='scss' scoped>
* {
  margin: 0;
  padding: 0;
}
.shelf-item-book {
  width: 100%;
  height: 100%;
  .shelf-item-book-cover {
    width: 100%;
    height: 100%;
  }
}
.isdragging{
  border: 2px solid red;
}
</style>
