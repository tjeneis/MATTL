export const state = () => ({
  wishlist: [
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
    }
  ],
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