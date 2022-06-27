export const state = () => ({
})

export const mutations = {
}

export const actions = {
  async get() {
    try {
      const { status, data } = await this.$repositories.products.get()

      if (status === 200 && data) return data
    }
    catch (errors) {
      const errorRes = this.$errorHandler.setAndParse(errors)
    }
  },
}