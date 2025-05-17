import { Router } from 'express'
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/products.controllers.js'
const productsRouter = Router()

productsRouter.get('/products', getProducts)
productsRouter.get('/products/:id', getProduct)
productsRouter.post('/products', createProduct)
productsRouter.put('/products/:id', updateProduct)
productsRouter.delete('/products/:id', deleteProduct)

export {
    productsRouter
}
