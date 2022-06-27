const resource = '/products';

export default ($axios) => ({
  get(payload) {
    return $axios.get(`${resource}`, { payload });
  },
  details(id) {
    return $axios.get(`${resource}/${id}`);
  }
});
