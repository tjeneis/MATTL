<template>
  <div class="d-flex align-center">
    <v-icon
      class="mr-5"
      :wishlist-count="wishlist.length"
    >
      $vuetify.icons.heart
    </v-icon>
    <div>
      <div class="text">
        {{ $t("pointsRemaining") }}
      </div>
      <v-scale-transition leave-absolute>
        <div
          :key="`points-${points}`"
          class="points"
        >
          {{ points | formatNumber }}
          {{ $t("points") }}
        </div>
      </v-scale-transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      firstName: state => state.customer.firstName,
      wishlist: state => state.wishlist.wishlist
    }),
    points () {
      return this.wishlist?.reduce((sum, item) => sum + item.points, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
div::v-deep {
  .v-icon {
    &::before {
      background-color: var(--v-primary-base);
      border-radius: 50%;
      color: #fff;
      content: attr(wishlist-count);
      font-size: 0.75rem;
      height: 20px;
      left: 15px;
      line-height: 20px;
      position: absolute;
      text-align: center;
      top: -10px;
      width: 20px;
    }
  }

  .text {
    color: #474a4d;
    font-size: 0.625rem;
    letter-spacing: 1px;
    opacity: 0.5;
    text-transform: uppercase;
  }

  .points {
    color: #252525;
    font-size: 1.125rem;
    line-height: 1.25;
  }
}
</style>
