<template>
  <div id="toast-container" class="d-flex flex-row pa-8">
    <div id="santa" class="rounded-circle elevation-6">
      <santa />
    </div>
    <div id="toasts">
      <div role="alert" class="toast white primary--text rounded-xl elevation-6" v-for="(toast, index) in toasts" :key="index" v-html="`This is message ${index + 1}`" />
    </div>
  </div>
</template>

<script>
import santa from "~/assets/santa.svg?inline";

export default {
  components: {
    santa
  },
  data() {
    return {
      toasts: Array(Math.floor(Math.random() * 10))
    }
  },
  created() {
    // try {
    //   const webSocket = new WebSocket("ws://localhost:3000/");

    //   webSocket.onopen = (event) => {
    //     console.log(event)
    //     console.log("Successfully connected to the echo websocket server...")
    //   }

    //   webSocket.onmessage = () => {
    //   }
    // } catch(err) {
    //   console.log(err);
    // }
  }
}
</script>

<style lang="scss">
  #toast-container {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;

    #santa {
      width: 48px;
      height: 48px;
      background: #000F4B;

      svg {
        transform: translate(-13px, -2px);
      }
    }

    #toasts {
      list-style: none;
      display: flex;
      flex-direction: column-reverse;
      position: fixed;
      bottom: 48px;
      left: 90px;

      .toast {
        position: relative;
        padding: 4px 12px;
        margin: 0 auto 12px 0;
        font-weight: 700;

        &:first-child {
          &:after {
            content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='16' viewBox='0 0 14 16' fill='none'%3E%3Cpath d='M0 16C0 16 2.98618 14.3858 2.98618 0C6.71892 1.77778 16.424 1.06667 13.4378 6.85714C9.7051 14.0952 0 16 0 16Z' fill='white'/%3E%3C/svg%3E%0A");
            position: absolute;
            bottom: 0;
            left: 0;
            transform: translateY(50%);
          }
        }

        &:not(:first-child) {
          opacity: 0.5;
        }
      }
    }
  }
</style>