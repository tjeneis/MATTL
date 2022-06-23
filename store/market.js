export const state = () => ({
  snow: false,
})

export const mutations = {
  setSnow(state, snow) {
    state.snow = snow
  },
}

export const actions = {
  letItSnow({ commit }, snow) {
    commit('setSnow', snow)
  },
}