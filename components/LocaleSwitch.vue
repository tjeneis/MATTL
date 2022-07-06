<template>
  <v-menu
    bottom
    offset-y
    open-on-hover
    transition="slide-y-transition"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        icon
        v-on="on"
      >
        <flag :iso="locale.iso" />
      </v-btn>
    </template>
    <v-list class="py-0">
      <v-list-item
        v-for="l in locales"
        :key="l.code"
        @click="setLocale(l)"
      >
        <v-list-item-icon class="mr-2">
          <flag
            :iso="l.iso"
            :squared="false"
          />
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t(l.code) }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  computed: {
    locale () {
      const { locale, locales } = this.$i18n
      return locales.find(l => l.code === locale)
    },
    locales () {
      const { locale, locales } = this.$i18n
      return locales.filter(l => l.code !== locale)
    }
  },
  methods: {
    setLocale ({ code }) {
      this.$i18n.setLocale(code)
      this.$vuetify.lang.current = code
    }
  }
}
</script>

<style lang="scss" scoped>
.v-btn {
  font-size: 36px !important;
  overflow: hidden;
}
</style>
