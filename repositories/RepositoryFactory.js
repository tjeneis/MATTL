import CustomerRepository from './CustomerRepository';
import MarketRepository from './MarketRepository';
import ProductRepository from './ProductRepository';
import WishlistRepository from './WishlistRepository';

export default ($axios) => ({
  customer: CustomerRepository($axios),
  market: MarketRepository($axios),
  product: ProductRepository($axios),
  wishlist: WishlistRepository($axios)
});
