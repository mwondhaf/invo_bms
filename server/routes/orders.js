import express from "express"
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders
} from "../controllers/orders.js"

const router = express.Router()

router.post("/", createOrder)
// router.put("/:id", updateProduct)
router.delete("/:id", deleteOrder)
router.get("/:id", getOrder)

router.get("/", getOrders)

export default router
