const resource = '/wishlist';

export default ($axios) => ({
  get() {
    return $axios.get(`${resource}/get`);
  },
  add(productId) {
    return $axios.post(`${resource}/add/${productId}`);
  },
  remove(productId) {
    return $axios.delete(`${resource}/remove/${productId}`);
  }
});
