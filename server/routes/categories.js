import express from "express"
import {
  createCategory,
  deleteCategory,
  getCategories
} from "../controllers/categories.js"

const router = express.Router()

router.post("/", createCategory)
// router.put("/:id", updatePost)
router.delete("/:id", deleteCategory)
// // router.get("/:id", getPost)

router.get("/", getCategories)

export default router
