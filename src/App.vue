<template>
  <div>
    <router-view  :key="activeDate"/>
  </div>
</template>

<script>
var fontSize;
document.addEventListener("DOMContentLoaded", function () {
  var html = document.querySelector("html");
  fontSize = window.innerWidth / 25;
  fontSize > 20 ? (fontSize = 20) : null;
  html.style.fontSize = fontSize + "px";
});

export default {
  computed:{
    activeDate(){
      return new Date();
    }
  }
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
