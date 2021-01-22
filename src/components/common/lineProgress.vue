<template>
  <div class="line-progress">
    <div class="outside-line" :style="{'background-color': color1}">
      <div class="inside-line" :style="{'background-color': color2 , 'width': width+'%'}"></div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        color1:{
            type: String,
            default: 'transparent',
        },
        color2:{
            type: String,
            default: 'red'
        },
        width:{
            type: Number,
            default: 1
        }
    }
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.line-progress {
  width: 100%;
  height: 100%;
  height: .2rem;
  z-index: 1000;
  .outside-line {
    width: 100%;
    height: 100%;
    .inside-line {
        height: 100%;
    }
  }
}
</style>