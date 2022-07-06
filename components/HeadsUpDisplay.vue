<template>
  <div id="hud">
    <div class="d-flex justify-center">
      <div class="logo">
        <kerstival
          :style="{
            width: 150 + 'px',
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import kerstival from '~/assets/kerstival.svg?inline'

export default {
  components: {
    kerstival
  },
  computed: {
    ...mapState({
      wishlist: state => state.wishlist.wishlist,
      snow: state => state.market.snow
    })
  }
}
</script>

<style lang="scss">
#hud {
  height: 100%;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;

  > div > * {
    pointer-events: auto;
    position: relative;
  }

  .logo {
    margin-top: 1.5rem;
  }

  .controls {
    bottom: 0;
    position: absolute;
    right: 0;
  }
}
</style>
