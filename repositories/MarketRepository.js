const resource = '/store'

export default $axios => ({
  getTheme (storeId) {
    return $axios.get(`${resource}/${storeId}/theme`)
  },
  getCategories (storeId) {
    return $axios.get(`${resource}/${storeId}/categories`)
  }
})
