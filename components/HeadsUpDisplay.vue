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
import { mapState } from "vuex";
import kerstival from "~/assets/kerstival.svg?inline";

export default {
  components: {
    kerstival,
  },
  async fetch({ store }) {
    await store.dispatch("wishlist/get");
  },
  computed: {
    ...mapState({
      wishlist: (state) => state.wishlist.wishlist,
      snow: (state) => state.market.snow,
    }),
  },
};
</script>

<style lang="scss">
#hud {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  pointer-events: none;
  width: 100%;
  height: 100%;

  > * {
    position: relative;
    pointer-events: auto;
  }

  .logo {
    margin-top: 1.5rem;
  }

  .controls {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>