<template>
  <div class="d-flex align-center">
    <v-icon class="mr-5" :wishlist-count="wishlist.length"
      >$vuetify.icons.heart</v-icon
    >
    <div>
      <div class="text">{{ $t("pointsRemaining") }}</div>
      <v-scale-transition leave-absolute>
        <div class="points" :key="`points-${points}`">
          {{ points | formatNumber }}
          {{ $t("points") }}
        </div>
      </v-scale-transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      firstName: (state) => state.customer.firstName,
      wishlist: (state) => state.wishlist.wishlist,
    }),
    points() {
      let sum = 0;
      return this.wishlist.reduce((sum, item) => sum + item.points, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
div::v-deep {
  .v-icon {
    &::before {
      content: attr(wishlist-count);
      position: absolute;
      width: 20px;
      height: 20px;
      line-height: 20px;
      background-color: var(--v-primary-base);
      border-radius: 50%;
      color: #fff;
      font-size: 0.75rem;
      text-align: center;
      left: 15px;
      top: -10px;
    }
  }

  .text {
    text-transform: uppercase;
    font-size: 0.625rem;
    letter-spacing: 1px;
    color: #474a4d;
    opacity: 0.5;
  }

  .points {
    font-size: 1.125rem;
    line-height: 1.25;
    color: #252525;
  }
}
</style>