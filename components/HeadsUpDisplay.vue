<template>
  <div id="hud">
    <div class="d-flex justify-center">
      <div class="logo">
        <kerstival :style="{
          width: 150 + 'px'
        }" />
      </div>
    </div>

    <!-- <div class="controls p-6">
      <button type="button" class="bg-slate-600 hover:bg-slate-700 px-5 py-2 text-sm leading-5 rounded-full font-bold text-white" @click="toggleSnow()">
        <font-awesome-icon class="pr-1" icon="snowflake" />
        Let it snow!
      </button>
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import kerstival from '~/assets/kerstival.svg?inline'

export default {
  components: {
    kerstival
  },
  async fetch({ store }) {
    await store.dispatch('wishlist/get')
  },
  ,
  computed: {
    ...mapState({
      wishlist: (state) => {
        return state.wishlist.wishlist
      }
    })
  },
  methods: {
    toggleSnow() {
      this.$bus.$emit('toggle-snow')
    }
  }
}
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