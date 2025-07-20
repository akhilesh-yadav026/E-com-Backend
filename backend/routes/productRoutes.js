import express from 'express'
import {addProduct , listproduct , removeproduct ,singleProduct} from '../controllers/productController.js'

const productRouter = express.Router();

productRouter.post('/add' , addProduct)
productRouter.get("/list" , listproduct)
productRouter.post('/remove', removeproduct)
productRouter.post('/single', singleProduct)

export default productRouter
