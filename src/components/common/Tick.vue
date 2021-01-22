<template>
  <div class="tick-wrapper" v-if="ifTickVisible">
    <svg width="400" height="400">
      <circle
        fill="none"
        stroke="#68E534"
        stroke-width="20"
        cx="200"
        cy="200"
        r="190"
        class="circle"
        stroke-linecap="round"
        transform="rotate(-90 200 200) "
      />
      <polyline
        fill="none"
        stroke="#68E534"
        stroke-width="24"
        points="88,214 173,284 304,138"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="tick"
      />
    </svg>
    <h2>{{ dialog }}</h2>
  </div>
</template>

<script>
export default {
  props: ["dialog"],
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.tick-wrapper {
  zoom: 0.1;
  @include verticalCenter;
}

.circle {
  stroke-dasharray: 1194;
  stroke-dashoffset: 1194;
  animation: circle 1s ease-in-out;
  animation-fill-mode: forwards;
}

.tick {
  stroke-dasharray: 350;
  stroke-dashoffset: 350;
  animation: tick 0.8s ease-out;
  animation-fill-mode: forwards;
  animation-delay: 0.95s;
}

h2 {
  font-family: Helvetica;
  font-size: 10rem;
  margin-top: 8rem;
  color: $color-gray4;
  opacity: 0;
  animation: 0.6s title ease-in-out;
  animation-delay: 1.2s;
  animation-fill-mode: forwards;
}

@keyframes circle {
  from {
    stroke-dashoffset: 1194;
  }

  to {
    stroke-dashoffset: 2388;
  }
}

@keyframes tick {
  from {
    stroke-dashoffset: 350;
  }

  to {
    stroke-dashoffset: 0;
  }
}

@keyframes title {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>