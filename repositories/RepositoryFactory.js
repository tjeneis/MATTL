import GamesRepository from './GamesRepository'
import MarketRepository from './MarketRepository'
import ProductsRepository from './ProductsRepository'
import WishlistRepository from './WishlistRepository'

export default $axios => ({
  games: GamesRepository($axios),
  market: MarketRepository($axios),
  products: ProductsRepository($axios),
  wishlist: WishlistRepository($axios)
})
