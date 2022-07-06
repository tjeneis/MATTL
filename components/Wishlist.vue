<template>
  <v-navigation-drawer
    v-model="active"
    absolute
    right
    temporary
    :width="width"
  >
    <v-container
      class="pa-8 pb-0 white"
      :style="{
        maxWidth: 'unset',
      }"
    >
      <v-row align="center">
        <v-col cols="auto">
          <h3 class="text-h5 font-weight-bold primary--text">
            {{ $t("wishlist") }}
          </h3>
        </v-col>
        <v-spacer />
        <v-col
          v-if="$vuetify.breakpoint.mdAndUp"
          cols="auto"
        >
          <PointsWidget />
        </v-col>
        <v-col cols="auto">
          <v-tooltip left>
            <template #activator="{ on, attrs }">
              <v-btn
                color="#F4F9FA"
                :elevation="0"
                fab
                small
                v-bind="attrs"
                v-on="on"
                @click="active = false"
              >
                <v-icon>fa-times</v-icon>
              </v-btn>
            </template>
            <span class="text-capitalize">{{ $t("close") }}</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      class="flex-grow-1 d-flex flex-column pa-8"
      :style="{
        maxWidth: 'unset',
      }"
    >
      <v-divider />

      <v-list>
        <v-slide-x-transition group>
          <template v-for="(id, index) in wishlist">
            <v-list-item
              :key="id"
              class="px-0 py-3"
            >
              <v-list-item-avatar
                :size="48"
                tile
              >
                <v-img
                  contain
                  :src="product(id)?.image"
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="product(id)?.languages[$i18n.locale].name" />
                <v-list-item-subtitle>
                  {{ (product.points && 0) | formatNumber }}
                  {{ $t("points") }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                  class="font-weight-regular"
                  color="#9B9B9B"
                  rounded
                  small
                  text
                  @click="removeFromWishlist(id)"
                >
                  <v-icon left>
                    fa-trash-can
                  </v-icon>
                  {{ $t("delete") }}
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider :key="index" />
          </template>
        </v-slide-x-transition>
      </v-list>

      <v-btn
        block
        class="flex-grow-0 mt-auto"
        color="primary"
        depressed
        :large="$vuetify.breakpoint.mdAndUp"
        rounded
      >
        {{ $t("visitWebshop") }}
      </v-btn>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      active: false
    }
  },
  computed: {
    ...mapState({
      catalog: state => state.products.catalog,
      wishlist: state => state.wishlist.wishlist
    }),
    width () {
      const { mdAndUp, smAndDown } = this.$vuetify.breakpoint

      if (mdAndUp) { return '50%' } else if (smAndDown) { return '100%' } else { return '75%' }
    }
  },
  beforeMount () {
    this.$bus.$on('toggle-wishlist', (payload) => {
      this.key = payload
      this.toggleWishlist()
      this.$forceUpdate()
    })
  },
  methods: {
    ...mapActions({
      removeFromWishlist: 'wishlist/remove'
    }),
    toggleWishlist () {
      this.active = !this.active
    },
    product (id) {
      return this.catalog?.find(p => p.product_id === id)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-navigation-drawer::v-deep {
  .v-navigation-drawer__content {
    display: flex;
    flex-direction: column;
  }
}

.v-list-item {
  &__title {
    color: #252525;
    font-size: 1.125rem;
  }

  &__subtitle {
    color: #9b9b9b !important;
  }
}
</style>
