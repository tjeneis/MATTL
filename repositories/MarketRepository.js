const resource = '/market';

export default ($axios) => ({
  theme() {
    return $axios.get(`${resource}/theme`);
  },
  catalog() {
    return $axios.get(`${resource}/catalog`);
  },
  info() {
    return $axios.get(`${resource}/info`);
  }
});
