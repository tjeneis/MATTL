<template>
  <v-menu
    bottom
    :close-on-content-click="false"
    offset-y
    transition="slide-y-transition"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-bind="attrs"
        append-icon="$vuetify.icons.dropdown"
        hide-details
        outlined
        readonly
        :value="`${$root.$options.filters.formatNumber(
          range[0]
        )} - ${$root.$options.filters.formatNumber(range[1])} ${$t('points')}`"
        v-on="on"
        @click:append="on.click"
      />
    </template>
    <v-card class="pa-3">
      <v-row
        class="ma-0"
        dense
      >
        <v-col cols="auto">
          <v-text-field
            v-model="range[0]"
            dense
            hide-details
            outlined
            :step="500"
            style="width: 100px"
            type="number"
          />
        </v-col>
        <v-col cols="auto">
          <v-text-field
            v-model="range[1]"
            dense
            hide-details
            outlined
            :step="500"
            style="width: 100px"
            type="number"
          />
        </v-col>
      </v-row>

      <v-range-slider
        v-model="range"
        hide-details
        :max="max"
        :min="min"
        :step="500"
      />
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data () {
    return {
      min: 0,
      max: 100000,
      range: [0, 100000]
    }
  }
}
</script>
