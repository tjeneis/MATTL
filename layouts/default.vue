<template>
  <v-app>
    <HeadsUpDisplay />
    <JournalTicker />
    <WishList />
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
  height: 100vh;
  height: -webkit-fill-available;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: relative;
  width: 100%;
}
</style>
