<template>
  <div class="ebook-footer">
    <span class="ebook-footer-text">{{progress + '%'}}</span>
    <!-- <span class="ebook-footer-text">{{this.paginate}}</span> -->
  </div>
</template>

<script>
import { getReadProgress } from "@/utils/localStorage";

export default {
  
  mounted(){
    const lsprogress = getReadProgress(this.fileName);
    if(lsprogress){
      this.SET_PROGRESS(lsprogress)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "@/assets/styles/global.scss";
  .ebook-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 100;
    
    width: 100%;
    height: 2rem;

    padding: 0 .4rem;
    box-sizing: border-box;
    
    @include right;
    .ebook-footer-text {
      font-size: .6rem;
      color: $color-gray3;
    }
  }
</style>
