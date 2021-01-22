<template>
<div class="bookmark" :style="style"></div>
</template>

<script>
export default {
    props:{
        color: String,
    },
    computed:{
        style(){
            if(this.color){
                return {
                    borderColor: `${this.color} ${this.color} transparent ${this.color}`
                }
            }else{
                return {}
            }
        }
    }
}
</script>
<style lang='scss' scoped>
 @import "@/assets/styles/global.scss";
.bookmark{
    width: 0;
    height: 0;
    border-width: 2rem .6rem .6rem .6rem;
    border-style: solid;
    border-color: $color-white $color-white transparent $color-white ;
}
</style>