import { rest } from 'msw'

export default [
  rest.get('/wishlist', (req, res, ctx) => {
    return res([])
  })
]
