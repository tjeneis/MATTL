const resource = '/customer';

export default ($axios) => ({
  login(payload) {
    return $axios.post(`${resource}/login`, payload)
  },
  update(id, payload) {
    return $axios.post(`${resource}/${id}`, payload)
  }
});
