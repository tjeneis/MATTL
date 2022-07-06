<template>
  <div>
    <WeatherController />
    <WeatherSnow v-if="snow" />
    <WeatherSmoke v-if="smoke" />
    <MapWrapper />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      snow: state => state.market.snow,
      smoke: state => state.market.smoke
    })
  }
}
</script>
