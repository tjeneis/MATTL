export const state = () => ({
  wishlist: [],
})

export const mutations = {
  setWishlist(state, wishlist) {
    state.wishlist = wishlist
  },
}

export const actions = {
  async get({ commit }) {
    const { status, data } = await this.$repositories.wishlist.get()

    if (status === 200 && data.success && data.code) {
      const { data } = data
      commit('setWishlist', data)
    } else {
      // Handle error here
    }
  },
  async add({ commit }, productId) {
    const { status, data } = await this.$repositories.wishlist.add(productId)
    
    if (status === 200 && data.success && data.code) {
      const { data } = data
      commit('setWishlist', data)
    } else {
      // Handle error here
    }
  },
  async remove({ commit }, productId) {
    const { status, data } = await this.$repositories.wishlist.remove(productId)
    
    if (status === 200 && data.success && data.code) {
      const { data } = data
      commit('setWishlist', data)
    } else {
      // Handle error here
    }
  },
}