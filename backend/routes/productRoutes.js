import express from 'express'
import {addProduct , listproduct , removeproduct ,singleProduct} from '../controllers/productController.js'
import upload from '../middleware/multer.js';

const productRouter = express.Router();

productRouter.post('/add' ,upload.fields([{name:'image1', maxCount : 1},{name:'image2', maxCount : 1},{name:'image3', maxCount : 1},{name:'image4', maxCount : 1}]), addProduct)
productRouter.get("/list" , listproduct)
productRouter.post('/remove', removeproduct)
productRouter.post('/single', singleProduct)

export default productRouter
 