const resource = '/games'

export default $axios => ({
  getHighscores (id) {
    return $axios.get(`${resource}/highscores/${id}`)
  },
  updateHighscore (id, payload) {
    return $axios.post(`${resource}/highscores/${id}`, payload)
  }
})
