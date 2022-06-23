<template>
  <div id="snow" v-show="snow">
    <div class="snowflake" v-for="index in 50" :key="index" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      snow: (state) => state.market.snow
    })
  }
}
</script>

<style lang="scss">
  #snow {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    pointer-events: none;
  }

  .snowflake {
    --size: 1vw;
    width: var(--size);
    height: var(--size);
    background: white;
    border-radius: 50%;
    position: absolute;
    top: -5vh;
    will-change: position, width, height;
  }

  @for $i from 1 through 50 {
    .snowflake:nth-child(#{$i}) {
      --size: #{random(5) * 0.2}vw;
      --left-ini: #{random(20) - 10}vw;
      --left-end: #{random(20) - 10}vw;
      left: #{random(100)}vw;
      animation: snowfall #{5 + random(10)}s linear infinite;
      animation-delay: -#{random(10)}s;
    }
  }

  /* added small blur every 6 snowflakes*/
  .snowflake:nth-child(6n) {
    filter: blur(1px);
  }
</style>