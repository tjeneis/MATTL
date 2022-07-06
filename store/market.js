export const state = () => ({
  categories: [],
  storeId: 29933,
  color: undefined,
  dateStart: undefined,
  dateEnd: undefined,
  logo: undefined,
  title: undefined,
  message: undefined,
  snow: false,
  smoke: false
})

export const mutations = {
  setSnow (state, snow) {
    state.snow = snow
  },
  setSmoke (state, smoke) {
    state.smoke = smoke
  },
  setCategories (state, categories) {
    state.categories = categories
  },
  setConfig (state, config) {
    state.color = config.config_color
    state.dateStart = config.config_date_start
    state.dateEnd = config.config_date_end
    state.logo = config.config_logo
    state.title = config.config_title
    state.message = config.config_webtext
  }
}

export const actions = {
  letItSnow ({ commit }, snow) {
    commit('setSnow', snow)
  },

  letItSmoke ({ commit }, smoke) {
    commit('setSmoke', smoke)
  },

  async getCategories ({ commit, state }) {
    try {
      const { storeId } = state
      const { status, data } = await this.$repositories.market.getCategories(storeId)

      if (status === 200 && data) { commit('setCategories', data) }
    } catch (errors) {
      const errorRes = this.$errorHandler.setAndParse(errors)

      this.$toast.error(errorRes.message)
    }
  },

  async getConfig ({ commit, state }) {
    try {
      const { storeId } = state
      const { status, data } = await this.$repositories.market.getTheme(storeId)

      if (status === 200 && data) { commit('setConfig', data) }
    } catch (errors) {
      const errorRes = this.$errorHandler.setAndParse(errors)

      this.$toast.error(errorRes.message)
    }
  }
}
