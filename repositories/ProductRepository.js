const resource = '/product';

export default ($axios) => ({
  details(id) {
    return $axios.get(`${resource}/details/${id}`);
  }
});
