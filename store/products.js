export const state = () => ({
  catalog: []
})

export const mutations = {
  setCatalog (state, catalog) {
    state.catalog = catalog
  }
}

export const actions = {
  async getCatalog ({ commit }) {
    try {
      const { status, data } = await this.$repositories.products.get()

      if (status === 200 && data) { commit('setCatalog', data.slice(0, 100)) }
    } catch (errors) {
      console.log(errors)
      const errorRes = this.$errorHandler.setAndParse(errors)

      this.$toast.error(errorRes.message)
    }
  }
}
