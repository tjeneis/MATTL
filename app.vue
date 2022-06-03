<template>
  <HeadsUpDisplay />
  <SnowFlakes />
  <NuxtPage />
</template>

<script setup>
  useHead({
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  })
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    min-height: 100vh;
    min-height: -webkit-fill-available;
    width: 100%;
    overflow: hidden;
    position: relative;
  }
</style>