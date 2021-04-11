import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrdersSeller,
  getOrdersAdmin,
} from '../controllers/orderController.js'
import { protect, admin,seller } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, seller, getOrdersSeller)
router.route('/admin').get(protect, admin, getOrdersAdmin)

router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router
