<template>
  <v-app>
    <v-main class="d-flex align-center">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'LoginLayout'
}
</script>

<style lang="scss">
html {
  height: -webkit-fill-available;
}

body {
  height: 100vh;
  height: -webkit-fill-available;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: relative;
  width: 100%;
}

.v-application {
  background: var(--v-primary-base) !important;
}
</style>
