import express from "express"
import {
  createCustomer,
  deleteCustomer,
  getCustomers
} from "../controllers/customers.js"

const router = express.Router()

router.post("/", createCustomer)
// router.put("/:id", updatePost)
router.delete("/:id", deleteCustomer)
// router.get("/:id", getPost)

router.get("/", getCustomers)

export default router
