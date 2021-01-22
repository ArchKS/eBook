<template>
  <div class="outbar">
    <div class="scroll-wrapper" ref="scrollWrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
    },
  },
  watch: {
    height: function (val) {
      // console.log("watch height val: ", val);
      this.$refs.scrollWrapper.style.height = val + "px";
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.scroll-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: hidden;
    width: 0 !important;
  }
}
</style>
