<template>
  <v-navigation-drawer v-model="active" :key="key" absolute color="primary darken-1" right temporary width="75%">
    <v-container class="pa-8" :style="{
      maxWidth: 'unset'
    }">
      <v-row class="pb-3">
        <v-col>
          <h3 class="text-h3 font-weight-bold">{{ key }}</h3>
        </v-col>
      </v-row>
      <client-only>
        <v-row v-masonry>
          <v-col v-masonry-tile class="item" :key="index" v-for="(product, index) in products" cols="12" md="3">
            <v-card flat light height="100%">
              <v-img :src="`https://api.lorem.space/image/watch?index=${index}`" @load="$redrawVueMasonry()"></v-img>
              
                <v-row
                  align="center"
                  class="mx-0 mt-0"
                >

                  <v-card-title>{{ product.title }}</v-card-title>
                  <v-spacer />
                  <v-icon class="pr-4">
                    fa-heart
                  </v-icon>
                </v-row>
                
              <v-card-text>{{ product.description }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </client-only>
  </v-container>
  </v-navigation-drawer>
</template>

<script>

export default {
  data() {
    return {
      active: false,
      key: undefined,
      products: [
        {
          title: 'Product title',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur, ligula et bibendum tempor, nulla ante pretium nunc, id laoreet mi sapien in tortor. Proin sollicitudin efficitur nisl nec euismod. Donec euismod nisi eu arcu faucibus, a faucibus nunc dapibus.'
        },
        {
          title: 'Product title',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur, ligula et bibendum tempor, nulla ante pretium nunc, id laoreet mi sapien in tortor. Proin sollicitudin efficitur nisl nec euismod. Donec euismod nisi eu arcu faucibus, a faucibus nunc dapibus.'
        },
        {
          title: 'Product title',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur, ligula et bibendum tempor, nulla ante pretium nunc, id laoreet mi sapien in tortor. Proin sollicitudin efficitur nisl nec euismod. Donec euismod nisi eu arcu faucibus, a faucibus nunc dapibus.'
        },
        {
          title: 'Product title',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur, ligula et bibendum tempor, nulla ante pretium nunc, id laoreet mi sapien in tortor. Proin sollicitudin efficitur nisl nec euismod. Donec euismod nisi eu arcu faucibus, a faucibus nunc dapibus.'
        },
        {
          title: 'Product title',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur, ligula et bibendum tempor, nulla ante pretium nunc, id laoreet mi sapien in tortor. Proin sollicitudin efficitur nisl nec euismod. Donec euismod nisi eu arcu faucibus, a faucibus nunc dapibus.'
        },
        {
          title: 'Product title',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur, ligula et bibendum tempor, nulla ante pretium nunc, id laoreet mi sapien in tortor. Proin sollicitudin efficitur nisl nec euismod. Donec euismod nisi eu arcu faucibus, a faucibus nunc dapibus.'
        },
        {
          title: 'Product title',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur, ligula et bibendum tempor, nulla ante pretium nunc, id laoreet mi sapien in tortor. Proin sollicitudin efficitur nisl nec euismod. Donec euismod nisi eu arcu faucibus, a faucibus nunc dapibus.'
        },
        {
          title: 'Product title',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur, ligula et bibendum tempor, nulla ante pretium nunc, id laoreet mi sapien in tortor. Proin sollicitudin efficitur nisl nec euismod. Donec euismod nisi eu arcu faucibus, a faucibus nunc dapibus.'
        },
        {
          title: 'Product title',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur, ligula et bibendum tempor, nulla ante pretium nunc, id laoreet mi sapien in tortor. Proin sollicitudin efficitur nisl nec euismod. Donec euismod nisi eu arcu faucibus, a faucibus nunc dapibus.'
        }
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
    toggleGallery() {
      this.active = !this.active;
    }
  }
}
</script>

<style lang="scss">
</style>