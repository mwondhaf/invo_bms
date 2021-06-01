import mongoose from "mongoose"

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: Number,
      unique: true,
      required: true
    },
    address: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
)

const Customer = mongoose.model("Customer", CustomerSchema)

export default Customer
