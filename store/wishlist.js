export const state = () => ({
  wishlist: []
})

export const mutations = {
  setWishlist (state, wishlist) {
    state.wishlist = wishlist
  }
}

export const actions = {
  async get ({ commit }) {
    try {
      const { status, data } = await this.$repositories.wishlist.get()

      if (status === 200 && data) { commit('setWishlist', data) }
    } catch (errors) {
      const errorRes = this.$errorHandler.setAndParse(errors)

      this.$toast.error(errorRes.message)
    }
  },

  async add ({ commit, state }, productId) {
    const wishlist = [...state.wishlist]
    wishlist.push(productId)
    await commit('setWishlist', wishlist)

    // try {
    //   const { status, data } = await this.$repositories.wishlist.add(productId)

    //   if (status === 200 && data) { commit('setWishlist', data) }
    // } catch (errors) {
    //   const errorRes = this.$errorHandler.setAndParse(errors)

    //   this.$toast.error(errorRes.message)
    // }
  },

  async remove ({ commit, state }, productId) {
    const wishlist = [...state.wishlist]
    const index = state.wishlist.indexOf(productId)
    await commit('setWishlist', wishlist.splice(index, 1))

    // try {
    //   const { status, data } = await this.$repositories.wishlist.remove(productId)

    //   if (status === 200 && data) { commit('setWishlist', data) }
    // } catch (errors) {
    //   const errorRes = this.$errorHandler.setAndParse(errors)

    //   this.$toast.error(errorRes.message)
    // }
  }
}
