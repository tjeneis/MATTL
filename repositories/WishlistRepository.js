const resource = '/wishlist'

export default $axios => ({
  get () {
    return $axios.get(`${resource}`)
  },
  add (productId) {
    return $axios.put(`${resource}/add/${productId}`)
  },
  remove (productId) {
    return $axios.delete(`${resource}/remove/${productId}`)
  }
})
