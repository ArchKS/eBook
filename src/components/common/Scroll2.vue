<template>
  <div
    class="scroll"
    :class="{ noScroll: ifNoScroll }"
    ref="scrollWrapper"
    @scroll.passive="handleScroll"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    top: {
      type: Number,
      default: 0,
    },
    bottom: {
      type: Number,
      default: 0,
    },
    ifNoScroll: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleScroll(e) {
      const y = e.target.scrollTop || window.pageYOffset || document.body.scrollTop;
      this.setHomeOffSetY(y)
    },

    refresh() {
      if (this.$refs.scrollWrapper) {
        let height = window.innerHeight -(this.top + this.bottom) * parseInt(this.htmlFontSize) + "px";
        this.$refs.scrollWrapper.style.height = height;
        this.$refs.scrollWrapper.addEventListener("scroll", this.handleScroll);
      }
    },
  },
  mounted() {
    this.getHTMLFontSize();
    this.refresh();
  },
  watch: {
    top(v){
      this.refresh()
    }
  }
};
</script>
<style lang='scss' scoped>
.scroll {
  position: relative;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: hidden;
    width:0 !important;
  }
  &.no-scroll {
    overflow: hidden;
  }
}
</style>