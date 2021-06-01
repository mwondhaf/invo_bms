import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      unique: true,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    sale_price: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true,
      default: 1
    },
    cost: {
      type: Number,
      required: true
    },
    brand: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
)

const Product = mongoose.model("Product", ProductSchema)

export default Product
