// 顶部标题栏
<template>
  <div class="home-title-wrapper">
    <div class="label">{{ label }}</div>
    <div class="btn" @click="click">{{ btn }}</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    label: String,
    btn: String,
  },
  methods: {
    click() {
      this.$emit("onClick");
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "@/assets/styles/global.scss";
.home-title-wrapper {
  width: 100%;
  padding: 1.6rem .6rem .8rem .6rem;
  height: 1rem;
  box-sizing: border-box;
  position: relative;
  @include center;
  .label {
    position: absolute;
    left: .5rem;
    font-size: 1.3rem;
    color: $color-gray4;
    font-weight: bold;
  }
  .btn {
    position: absolute;
    right: .7rem;
    font-size: 1rem;
    color: $color-blue3;
    &:active {
      color: $color-blue4;
    }
  }
}
</style>
