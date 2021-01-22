<template>
  <div class="shelf-item-add">
    <span class="icon-add"></span>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "@/assets/styles/global.scss";
  .shelf-item-add {
    width: 100%;
    height: 100%;
    border: .07rem solid $color-gray5;
    box-sizing: border-box;
    @include center;
    .icon-add {
      font-size: 3rem;
      color: $color-gray2;
    }
  }
</style>
