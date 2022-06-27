import CustomerRepository from './CustomerRepository';
import MarketRepository from './MarketRepository';
import ProductsRepository from './ProductsRepository';
import WishlistRepository from './WishlistRepository';

export default ($axios) => ({
  customer: CustomerRepository($axios),
  market: MarketRepository($axios),
  products: ProductsRepository($axios),
  wishlist: WishlistRepository($axios)
});
