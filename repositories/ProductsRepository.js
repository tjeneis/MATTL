const resource = '/catalog'

export default $axios => ({
  get () {
    return $axios.get(`${resource}`)
  }
})
