import Product from "../models/Product.js"

// create product
export const createProduct = async (req, res) => {
  const product = req.body

  const newProduct = new Product(product)
  try {
    await newProduct.save()
    res.status(201).json(newProduct)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

// get single Product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    try {
      await product.delete()
      res.status(200).json("Product has been deleted")
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// update product
export const updateProduct = async (req, res) => {
  try {
    const post = await Product.findById(req.params.id)
    try {
      const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body
        },
        { new: true }
      )
      res.status(200).json(updateProduct)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
