import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  selectProduct,
  getsellerProducts,
  getAdminProducts
} from '../controllers/productController.js'

import { protect, admin,seller } from '../middleware/authMiddleware.js'
//import { uploadS3 } from '../middleware/upload.js'

router.route('/').get(getProducts).post(protect,  seller, createProduct)
router.get('/seller',protect, seller,getsellerProducts)
router.get('/admin',protect, admin,getAdminProducts)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)
router.get('/select', selectProduct)

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, seller, deleteProduct)
  .delete(protect, admin, deleteProduct)
  .put(protect, seller, updateProduct)


export default router
