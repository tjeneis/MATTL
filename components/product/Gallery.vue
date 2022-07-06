<template>
  <v-navigation-drawer
    :key="categoryId"
    v-model="active"
    absolute
    color="#F4F9FA"
    right
    temporary
    :width="width"
  >
    <v-container
      class="pa-8 white"
      :style="{
        maxWidth: 'unset',
      }"
    >
      <v-row align="center">
        <v-col cols="auto">
          <h3
            class="text-h4 font-weight-bold"
            v-html="category?.languages[$i18n.locale].name"
          />
        </v-col>
        <v-spacer />
        <v-col
          v-if="$vuetify.breakpoint.mdAndUp"
          cols="auto"
        >
          <PointsWidget class="pr-4" />
        </v-col>
        <v-col
          cols="auto"
          order-md="3"
        >
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
        <v-col
          cols="12"
          md="auto"
          order-md="1"
        >
          <InputRangeSlider />
        </v-col>
        <v-col
          cols="12"
          md="auto"
          order-md="2"
        >
          <v-select
            v-model="sort"
            hide-details
            :items="sorting"
            :menu-props="{
              offsetY: true,
            }"
            outlined
            :placeholder="$t('sortOn')"
            return-object
          />
        </v-col>
      </v-row>
    </v-container>
    <v-container
      class="pa-8"
      :style="{
        maxWidth: 'unset',
      }"
    >
      <client-only>
        <v-row v-masonry>
          <v-col
            v-for="(product, index) in catalog"
            :key="index"
            v-masonry-tile
            class="item"
            cols="12"
            md="3"
          >
            <v-card
              class="v-card--product"
              :elevation="0"
              height="100%"
              light
              :ripple="false"
              @click="clickHandler(product)"
            >
              <v-img
                :src="product.image"
                @load="$redrawVueMasonry()"
              />

              <v-fade-transition>
                <v-icon
                  v-if="isSelected(product.product_id)"
                  key="is-selected"
                  class="v-card__wishlist"
                  color="primary"
                  :size="24"
                >
                  $vuetify.icons.heartAlt
                </v-icon>
                <v-icon
                  v-else
                  key="is-not-selected"
                  class="v-card__wishlist"
                  :size="24"
                >
                  $vuetify.icons.heart
                </v-icon>
              </v-fade-transition>

              <div class="pt-5">
                <div class="v-card__brand">
                  {{ product.model }}
                </div>
                <div class="v-card__title">
                  {{ product.languages[$i18n.locale].name }}
                </div>
                <div class="v-card__points">
                  <span>{{ (product.points && 0) | formatNumber }}</span>
                  {{ $t("points") }}
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </client-only>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      active: false,
      categoryId: undefined,
      sort: undefined,
      sorting: [
        {
          text: this.$t('name'),
          sort: 'name',
          order: 'ASC'
        },
        {
          text: `${this.$t('points')} ${this.$t('ascending')}`,
          sort: 'points',
          order: 'ASC'
        },
        {
          text: `${this.$t('points')} ${this.$t('descending')}`,
          sort: 'points',
          order: 'DESC'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      catalog: state => state.products.catalog,
      categories: state => state.market.categories,
      wishlist: state => state.wishlist.wishlist
    }),
    category () {
      return this.categories?.find(c => c.category_id === this.categoryId)
    },
    width () {
      const { smAndDown } = this.$vuetify.breakpoint

      if (smAndDown) { return '100%' } else { return '75%' }
    }
  },
  beforeMount () {
    this.$bus.$on('toggle-product-gallery', (categoryId) => {
      this.categoryId = categoryId
      this.toggleGallery()
      this.$forceUpdate()
    })
  },
  mounted () {
    if (typeof this.$redrawVueMasonry === 'function') {
      this.$redrawVueMasonry()
    }
  },
  methods: {
    ...mapActions({
      addToWishlist: 'wishlist/add',
      removeFromWishlist: 'wishlist/remove'
    }),
    toggleGallery () {
      this.active = !this.active
    },
    clickHandler (product) {
      const { product_id: id } = product
      if (this.isSelected(id)) { this.removeFromWishlist(id) } else { this.addToWishlist(id) }
    },
    isSelected (productId) {
      return this.wishlist?.map(p => p).includes(productId)
    }
  }
}
</script>

<style lang="scss" scoped>
div::v-deep {
  .v-text-field {
    input,
    .v-select__selection.v-select__selection--comma {
      color: #9b9b9b !important;
    }

    &.v-select.v-input--is-dirty {
      input {
        display: none;
      }
    }

    .v-select__selection {
      max-width: none;
    }
  }
}
</style>
