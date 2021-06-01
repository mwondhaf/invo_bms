import Category from "../models/Category.js"

// create category
export const createCategory = async (req, res) => {
  const category = req.body

  const newCategory = new Category(category)
  try {
    await newCategory.save()
    res.status(201).json(newCategory)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

// get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).json(categories)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// delete category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)

    try {
      await category.delete()
      res.status(200).json("Category has been deleted")
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
