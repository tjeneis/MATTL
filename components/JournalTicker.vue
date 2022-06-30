<template>
  <div id="journal" class="d-flex flex-row align-center pa-8">
    <div id="santa" class="rounded-circle">
      <santa />
    </div>
    <div id="marquee" class="d-flex align-center">
      <marquee-text>
        <template v-for="(entry, index) in journal">
          <div :key="index" class="d-inline" v-html="entry.message" />
          <div class="d-inline mx-6" style="opacity: 0.15">&bull;</div>
        </template>
      </marquee-text>
      <v-btn
        color="primary"
        dark
        depressed
        large
        rounded
        @click="toggleJournal()"
      >
        {{ $t("openJournal") }}
        <v-icon right>$vuetify.icons.dropdown</v-icon>
      </v-btn>
    </div>

    <v-dialog v-model="active" :width="750">
      <v-card>
        <v-container class="pa-6"
          ><v-row align="center">
            <v-col cols="auto">
              <h3 class="text-h5 font-weight-bold primary--text">
                {{ $t("journal") }}
              </h3>
            </v-col>
            <v-spacer />
            <v-col cols="auto">
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="#F4F9FA"
                    :elevation="0"
                    fab
                    small
                    @click="active = false"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>fa-times</v-icon>
                  </v-btn>
                </template>
                <span class="text-capitalize">{{ $t("close") }}</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-container>

        <v-list class="pt-0 pb-3">
          <v-slide-x-transition group>
            <template v-for="(entry, index) in journal">
              <v-divider :key="index" />
              <v-list-item class="px-6" :key="index">
                <v-list-item-content
                  class="flex-grow-0 pr-3"
                  style="overflow: visible"
                >
                  <v-list-item-subtitle>{{
                    entry.timestamp.toLocaleString("nl-NL")
                  }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title v-html="entry.message" />
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-slide-x-transition>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import santa from "~/assets/santa.svg?inline";

export default {
  components: {
    santa,
  },
  data() {
    return {
      active: false,
      journal: [
        {
          category: "Games",
          message: "This is a simple message",
          timestamp: new Date(),
        },
        {
          category: "Wishlist",
          message: "This is a <strong>strong</strong> message",
          timestamp: new Date(),
        },
        {
          category: "Games",
          message: "I also support emojis 🤯",
          timestamp: new Date(),
        },
        {
          category: "Wishlist",
          message: "This is another very longgggggggggg <i>italic</i> message",
          timestamp: new Date(),
        },
      ],
    };
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
  },
  methods: {
    toggleJournal() {
      this.active = !this.active;
    },
  },
};
</script>

<style lang="scss">
#journal {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2;
  max-width: 75%;

  #santa {
    width: 48px;
    height: 48px;
    background: #000f4b;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 8%);

    svg {
      transform: translate(-13px, -2px);
    }
  }

  #marquee {
    height: 44px;
    background: white;
    position: relative;
    border-radius: 22px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 8%);
    margin: 0 0 0 16px;
    width: 100%;

    &:after {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='16' viewBox='0 0 14 16' fill='none'%3E%3Cpath d='M0 16C0 16 2.98618 14.3858 2.98618 0C6.71892 1.77778 16.424 1.06667 13.4378 6.85714C9.7051 14.0952 0 16 0 16Z' fill='white'/%3E%3C/svg%3E%0A");
      position: absolute;
      bottom: 0;
      left: 0;
      transform: translateX(-7px) rotate(45deg);
    }

    .v-btn {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    .marquee-text-wrap {
      background: inherit;
      border-top-left-radius: 22px;
      border-bottom-left-radius: 22px;
      overflow: hidden;
      position: relative;

      &:before,
      &:after {
        content: "";
        position: absolute;
        height: 100%;
        width: 25px;
        display: block;
      }

      &:before {
        left: 0;
        background: linear-gradient(to right, white, transparent);
        z-index: 1;
      }

      &:after {
        right: 0;
        background: linear-gradient(to left, white, transparent);
      }
    }
  }
}
</style>