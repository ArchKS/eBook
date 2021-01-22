<template>
  <div class="title-wrapper" v-show="ifTitleAndMenuVisiable">
    <div class="left">
      <span class="icon-back" @click="back"></span>
    </div>
    <div class="right">
      <div class="icon-wrapper" @click="toShelf">
        <span class="icon-shelf"></span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toShelf(){
      this.$router.push({path: '/store/shelf'})
    }
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.title-wrapper {
  @include twoSide;

  width: 100%;
  height: 3rem;
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.15);
  font-size: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: $color-white;
}

.right {
  @include center;
}
.icon-back {
  margin: 0 0.2rem;
}
.icon-wrapper {
  margin: 0 0.6rem;
}
</style>