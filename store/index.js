export const actions = {
  async nuxtServerInit ({ dispatch }) {
    await dispatch('market/getConfig')
    await dispatch('market/getCategories')
    await dispatch('products/getCatalog')
  }
}
