import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      required: true
    },
    customer_phone: {
      type: Number,
      required: true
    },
    customer_address: {
      type: String,
      required: false
    },
    products: {
      type: Array,
      required: true
    },
    total_price: {
      type: Number,
      required: true
    },
    order_id: {
      type: String,
      required: true,
      unique: true,
      default: function () {
        return Math.floor(100000 + Math.random() * 90000000)
      }
    }
  },
  { timestamps: true }
)

const Order = mongoose.model("Order", OrderSchema)

export default Order
