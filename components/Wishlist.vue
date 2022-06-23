<template>
  <v-navigation-drawer v-model="active" absolute right temporary width="75%">
    <v-container class="pa-8 pb-0 white" :style="{
      maxWidth: 'unset'
    }">
      <v-row align="center">
        <v-col>
          <h3 class="text-h4 font-weight-bold">{{ $t('wishlist') }}</h3>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="pa-8" :style="{
      maxWidth: 'unset'
    }">
      <v-list>
        <template v-for="(product, index) in wishlist">
          <v-divider :key="index" />
          <v-list-item class="py-3" :key="product.id">
            <v-list-item-avatar tile>
              <v-img
                :src="`https://api.lorem.space/image/watch?index=${index}`"
                :lazy-src="`https://api.lorem.space/image/watch?index=${index}?w=100`"
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="product.title" />
              <v-list-item-subtitle>{{ product.points | formatNumber }} {{ $t('points') }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                class="font-weight-regular"
                color="#9B9B9B"
                text
                rounded
                small
                @click="removeFromWishlist(product.id)"
              >
                <v-icon left>fa-trash-can</v-icon>
                {{ $t('delete') }}
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      active: false
    }
  },
  computed: {
    ...mapState({
      wishlist: (state) => state.wishlist.wishlist
    })
  },
  beforeMount() {
    this.$bus.$on('toggle-wishlist', payload => {
      this.key = payload
      this.toggleWishlist()
      this.$forceUpdate()
    });
  },
  methods: {
    ...mapActions({
      removeFromWishlist: 'wishlist/remove'
    }),
    toggleWishlist() {
      this.active = !this.active;
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-list-item {
    &__title {
      font-size: 1.25rem;
      color: #252525;
    }

    &__subtitle {
      color: #9B9B9B;
    }
  }
</style>