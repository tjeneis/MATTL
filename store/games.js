export const state = () => ({
  highscores: []
})

export const mutations = {
  setHighscore (state, data) {
    const index = state.highscores.findIndex(h => h.id === data.gameId)
    state.highscores[index].highscore = data.highscore
  }
}

export const actions = {
  async getHighscores ({ commit }) {
    try {
      const { status, data } = await this.$repositories.games.getHighscores()

      if (status === 200 && data) { commit('setHighscore', data) }
    } catch (errors) {
      const errorRes = this.$errorHandler.setAndParse(errors)

      this.$toast.error(errorRes.message)
    }
  },

  async updateHighscore ({ commit }, { gameId, highscore }) {
    try {
      const { status, data } = await this.$repositories.games.updateHighscore(gameId, highscore)

      if (status === 200 && data) { commit('setHighscore', data) }
    } catch (errors) {
      const errorRes = this.$errorHandler.setAndParse(errors)

      this.$toast.error(errorRes.message)
    }
  }
}
