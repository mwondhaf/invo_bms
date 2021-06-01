import Order from "../models/Order.js"

// create order
export const createOrder = async (req, res) => {
  const order = req.body

  const newOrder = new Order(order)
  try {
    await newOrder.save()
    res.status(201).json(newOrder)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

// get single Order bu prder id
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ order_id: req.params.id })
    res.status(200).json(order)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// get all orders
export const getOrders = async (req, res) => {
  console.log("====================================")
  console.log("get orders")
  console.log("====================================")
  try {
    const orders = await Order.find()
    res.status(200).json(orders)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// delete product
// export const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)
//     try {
//       await product.delete()
//       res.status(200).json("Product has been deleted")
//     } catch (error) {
//       res.status(500).json({ message: error.message })
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }

// update product
// export const updateProduct = async (req, res) => {
//   try {
//     const post = await Product.findById(req.params.id)
//     try {
//       const updateProduct = await Product.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: req.body
//         },
//         { new: true }
//       )
//       res.status(200).json(updateProduct)
//     } catch (error) {
//       res.status(500).json({ message: error.message })
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }
