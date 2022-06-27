export const state = () => ({
  snow: false,
  smoke: false,
})

export const mutations = {
  setSnow(state, snow) {
    state.snow = snow
  },
  setSmoke(state, smoke) {
    state.smoke = smoke
  }
}

export const actions = {
  letItSnow({ commit }, snow) {
    commit('setSnow', snow)
  },
  letItSmoke({ commit }, smoke) {
    commit('setSmoke', smoke)
  },
}