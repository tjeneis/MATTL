<template>
  <v-app>
    <HeadsUpDisplay />
    <EventToaster />
    <Wishlist />
    <ProductGallery />

    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<style lang="scss">
html {
  height: -webkit-fill-available;
}

body {
  margin: 0;
  padding: 0;
  height: 100vh;
  height: -webkit-fill-available;
  width: 100%;
  overflow: hidden;
  position: relative;
}
</style>