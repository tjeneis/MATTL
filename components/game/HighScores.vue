<template>
  <v-dialog :width="750">
    <template #activator="{ on, attrs }">
      <v-btn
        color="secondary"
        depressed
        large
        rounded
        v-bind="attrs"
        v-on="on"
      >
        <v-icon
          left
          :size="16"
        >
          fa-trophy
        </v-icon>
        {{ $t("viewHighScores") }}
      </v-btn>
    </template>
    <template #default="dialog">
      <v-card dark>
        <v-container class="pa-6">
          <v-row align="center">
            <v-col cols="auto">
              <h3 class="text-h5 font-weight-bold primary--text">
                {{ $t("highScores") }}
              </h3>
            </v-col>
            <v-spacer />
            <v-col cols="auto">
              <v-tooltip left>
                <template #activator="{ on, attrs }">
                  <v-btn
                    :elevation="0"
                    fab
                    small
                    v-bind="attrs"
                    v-on="on"
                    @click="dialog.value = false"
                  >
                    <v-icon>
                      fa-times
                    </v-icon>
                  </v-btn>
                </template>
                <span class="text-capitalize">{{ $t("close") }}</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-container>

        <v-list class="pt-0 pb-3">
          <v-slide-x-transition group>
            <template v-for="(score, index) in highscores">
              <v-divider :key="index" />

              <v-list-item
                :key="index"
                class="px-6"
              >
                <div class="d-flex flex-grow-1 align-center">
                  <small>{{ (index + 1) | formatNumber('Oo') }}</small>
                  <div class="pl-3">
                    {{ score.player }}
                  </div>
                </div>
                <v-list-item-actions>
                  <v-list-item-title class="text-h5">
                    {{ score.score | formatNumber }}
                  </v-list-item-title>
                </v-list-item-actions>
              </v-list-item>
            </template>
          </v-slide-x-transition>
        </v-list>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import highscores from '~/data/highscores'

export default {
  data () {
    return {
      highscores
    }
  },
  mounted () {
    this.getHighscores()
  },
  methods: {
    ...mapActions({
      getHighscores: 'games/getHighscores'
    })
  }
}
</script>

<style lang="scss" scoped>

@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

.v-dialog__content {
  font-family: "Press Start 2P", cursive !important;

  h1, h2, h3, h4, h5,
  [class^='text-'],
  [class*=' text-'] {
    font-family: "Press Start 2P", cursive !important;
  }
}
</style>
