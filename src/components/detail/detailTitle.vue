// 详情页标题
<template>
  <div class="detail-title">
    <div class="title-left-wrapper" @click="back">
      <span class="icon-back icon"></span>
    </div>
    <div class="title-right-wrapper">
      <span class="icon-shelf icon" @click="showBookShelf"></span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    
    showBookShelf() {
      this.$router.push({path: '/store/shelf'})
    },
  },
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.detail-title {
  height: 3rem;
  width: 100%;
  
  background-color: $color-white;
  
  @include twoSide; 
}

.icon {
  font-size: 1.6rem;
  padding: 1rem 0.5rem;
}
</style>