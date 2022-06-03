<template>
  <HeadsUpDisplay />
  <SnowFlakes />
  <NuxtPage />
</template>

<script setup>
  useHead({
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1. user-scalable=no',
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  })
</script>

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