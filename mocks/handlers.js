import { rest } from 'msw'
import products from '~/data/products'

export default [
  rest.get('/wishlist', (req, res, ctx) => {
    return res(ctx.json(products))
  }),
  rest.put('/wishlist/add/:productId', (req, res, ctx) => {
    return res(ctx.json(products))
  }),
  rest.delete('/wishlist/remove/:productId', (req, res, ctx) => {
    const { productId } = req.params
    console.log(productId)
    const data = products.filter(p => p.id != productId)
    return res(ctx.json(data))
  }),
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.json(products))
  }),
]