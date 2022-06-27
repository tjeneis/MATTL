<template>
  <v-navigation-drawer
    v-model="active"
    :key="category"
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
          <h3 class="text-h4 font-weight-bold">{{ category }}</h3>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <points class="pr-4" />
        </v-col>
        <v-col cols="auto">
          <v-select
            v-model="sort"
            hide-details
            :items="sorting"
            outlined
            :menu-props="{
              offsetY: true,
            }"
            :placeholder="$t('sortOn')"
            return-object
          />
        </v-col>
        <v-col cols="auto">
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="#F4F9FA"
                :elevation="0"
                fab
                small
                @click="active = false"
                v-bind="attrs"
                v-on="on"
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
      class="pa-8"
      :style="{
        maxWidth: 'unset',
      }"
    >
      <client-only>
        <v-row v-masonry>
          <v-col
            v-masonry-tile
            class="item"
            :key="index"
            v-for="(product, index) in products"
            cols="12"
            md="3"
          >
            <v-card
              class="v-card--product"
              flat
              height="100%"
              light
              @click="clickHandler(product)"
            >
              <v-img :src="product.image" @load="$redrawVueMasonry()">
                <v-icon
                  :color="isSelected(product.id) ? 'primary' : 'default'"
                  :size="24"
                >
                  {{
                    isSelected(product.id)
                      ? "$vuetify.icons.heartFilled"
                      : "$vuetify.icons.heart"
                  }}
                </v-icon>
              </v-img>
              <div class="pa-5">
                <div class="v-card__brand">{{ product.brand }}</div>
                <div class="v-card__title">{{ product.title }}</div>
                <div class="v-card__points">
                  <span>{{ product.points | formatNumber }}</span>
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
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      active: false,
      category: undefined,
      products: [],
      sort: undefined,
      sorting: [
        {
          text: this.$t("name"),
          sort: "name",
          order: "ASC",
        },
        {
          text: `${this.$t("points")} ${this.$t("ascending")}`,
          sort: "points",
          order: "ASC",
        },
        {
          text: `${this.$t("points")} ${this.$t("descending")}`,
          sort: "points",
          order: "DESC",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      wishlist: (state) => state.wishlist.wishlist,
    }),
    width() {
      const { smAndDown } = this.$vuetify.breakpoint;

      if (smAndDown) return "100%";
      else return "75%";
    },
  },
  beforeMount() {
    this.$bus.$on("toggle-product-gallery", (payload) => {
      this.category = payload;
      this.toggleGallery();
      this.$forceUpdate();
    });
  },
  mounted() {
    if (typeof this.$redrawVueMasonry === "function") {
      this.$redrawVueMasonry();
    }
  },
  methods: {
    ...mapActions({
      getProducts: "products/get",
      addToWishlist: "wishlist/add",
      removeFromWishlist: "wishlist/remove",
    }),
    toggleGallery() {
      this.active = !this.active;
      if (this.active) {
        this.getProducts().then((res) => {
          this.products = res;
        });
      }
    },
    clickHandler(product) {
      const { id } = product;
      if (this.isSelected(id)) this.removeFromWishlist(id);
      else this.addToWishlist(id);
    },
    isSelected(productId) {
      return this.wishlist.map((p) => p.id).includes(productId);
    },
  },
};
</script>