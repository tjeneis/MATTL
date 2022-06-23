<template>
  <v-navigation-drawer v-model="active" :key="key" absolute color="#F4F9FA" right temporary width="75%">
    <v-container class="pa-8 white" :style="{
      maxWidth: 'unset'
    }">
      <v-row align="center">
        <v-col>
          <h3 class="text-h4 font-weight-bold">{{ key }}</h3>
        </v-col>
        <v-spacer />
        <v-col>
          <v-select
            v-model="sort"
            hide-details
            :items="sorting"
            outlined
            :menu-props="{
              offsetY: true
            }"
            :placeholder="$t('sortOn')"
            return-object
          />
        </v-col>
      </v-row>
    </v-container>
    <v-container class="pa-8" :style="{
      maxWidth: 'unset'
    }">
      <client-only>
        <v-row v-masonry>
          <v-col v-masonry-tile class="item" :key="index" v-for="(product, index) in products" cols="12" md="3">
            <v-card
              class="v-card--product"
              flat
              height="100%"
              light
              @click="addToWishlist(product.id)"
            >
              <v-img
                :src="`https://api.lorem.space/image/watch?index=${index}`"
                :lazy-src="`https://api.lorem.space/image/watch?index=${index}?w=100`"
                @load="$redrawVueMasonry()"
              >
                <v-icon :size="24">$vuetify.icons.heart</v-icon>
              </v-img>
              <div class="pa-5">
                <div class="v-card__brand">{{ product.brand }}</div>
                <div class="v-card__title">{{ product.title }}</div>
                <div class="v-card__points">
                  <span>{{ product.points | formatNumber }}</span>
                  {{ $t('points') }}
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
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      active: false,
      key: undefined,
      products: [
        {
          id: '',
          title: 'Square SQ1 - Orange',
          brand: 'Fujifilm Instax',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur, ligula et bibendum tempor, nulla ante pretium nunc, id laoreet mi sapien in tortor. Proin sollicitudin efficitur nisl nec euismod. Donec euismod nisi eu arcu faucibus, a faucibus nunc dapibus.',
          points: 3000,
        },
        {
          id: '',
          title: 'Stofzuiger Ecosenzo Plus',
          brand: 'Bestron',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur, ligula et bibendum tempor, nulla ante pretium nunc, id laoreet mi sapien in tortor. Proin sollicitudin efficitur nisl nec euismod. Donec euismod nisi eu arcu faucibus, a faucibus nunc dapibus.',
          points: 2000
        },
        {
          id: '',
          title: 'Cirkelzaag',
          brand: 'Fujifilm Instax',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur, ligula et bibendum tempor, nulla ante pretium nunc, id laoreet mi sapien in tortor. Proin sollicitudin efficitur nisl nec euismod. Donec euismod nisi eu arcu faucibus, a faucibus nunc dapibus.',
          points: 3000,
        },
        {
          id: '',
          title: 'Accuboormachine HYBRID',
          brand: 'Fujifilm Instax',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur, ligula et bibendum tempor, nulla ante pretium nunc, id laoreet mi sapien in tortor. Proin sollicitudin efficitur nisl nec euismod. Donec euismod nisi eu arcu faucibus, a faucibus nunc dapibus.',
          points: 3000,
        },
        {
          id: '',
          title: 'Mini 11 - Sky Blue',
          brand: 'Fujifilm Instax',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur, ligula et bibendum tempor, nulla ante pretium nunc, id laoreet mi sapien in tortor. Proin sollicitudin efficitur nisl nec euismod. Donec euismod nisi eu arcu faucibus, a faucibus nunc dapibus.',
          points: 3000,
        },
        {
          id: '',
          title: 'Onkruidborstel',
          brand: 'Fujifilm Instax',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur, ligula et bibendum tempor, nulla ante pretium nunc, id laoreet mi sapien in tortor. Proin sollicitudin efficitur nisl nec euismod. Donec euismod nisi eu arcu faucibus, a faucibus nunc dapibus.',
          points: 3000,
        },
        {
          title: 'Decoupeerzaag',
          brand: 'Fujifilm Instax',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur, ligula et bibendum tempor, nulla ante pretium nunc, id laoreet mi sapien in tortor. Proin sollicitudin efficitur nisl nec euismod. Donec euismod nisi eu arcu faucibus, a faucibus nunc dapibus.',
          points: 3000,
        },
        {
          id: '',
          title: 'Vlakschuurmachine',
          brand: 'Fujifilm Instax',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur, ligula et bibendum tempor, nulla ante pretium nunc, id laoreet mi sapien in tortor. Proin sollicitudin efficitur nisl nec euismod. Donec euismod nisi eu arcu faucibus, a faucibus nunc dapibus.',
          points: 3000,
        },
        {
          id: '',
          title: 'Klopboormachine',
          brand: 'Fujifilm Instax',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur, ligula et bibendum tempor, nulla ante pretium nunc, id laoreet mi sapien in tortor. Proin sollicitudin efficitur nisl nec euismod. Donec euismod nisi eu arcu faucibus, a faucibus nunc dapibus.',
          points: 3000,
        }
      ],
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
        },
      ]
    }
  },
  beforeMount() {
    this.$bus.$on('toggle-product-gallery', payload => {
      this.key = payload
      this.toggleGallery()
      this.$forceUpdate()
    });
  },
  mounted() {
    if (typeof this.$redrawVueMasonry === 'function') {
      this.$redrawVueMasonry()
    }
  },
  methods: {
    ...mapActions({
      addToWishlist: 'wishlist/add'
    }),
    toggleGallery() {
      this.active = !this.active;
    }
  }
}
</script>