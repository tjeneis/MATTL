
<template>
  <div id="weather-controls">
    <div class="d-flex flex-row align-center pa-8">
      <v-btn color="primary" dark fab small @click="letItSnow(!snow)">
        <v-icon :size="18">fa-snowflake</v-icon>
      </v-btn>
      <v-btn
        class="ml-3"
        color="primary"
        dark
        fab
        small
        @click="letItSmoke(!smoke)"
      >
        <v-icon :size="16">fa-smog</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      snow: (state) => state.market.snow,
      smoke: (state) => state.market.smoke,
    }),
  },
  methods: {
    ...mapActions("market", ["letItSnow", "letItSmoke"]),
  },
};
</script>

<style lang="scss">
#weather-controls {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;

  .v-btn {
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 8%);
  }
}
</style>