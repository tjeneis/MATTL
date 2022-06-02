<template>
  <div id="hud">
    <div class="logo rounded-br-xl inline-block p-6">
      <logo />
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
import logo from "~/assets/logo.svg?component";

export default {
  components: {
    logo
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
    height: 100vh;

    > * {
      position: relative;
      pointer-events: auto;
    }

    .logo {
      background: #f6f8f9;
    }

    .controls {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
</style>