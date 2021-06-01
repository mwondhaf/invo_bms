import Customer from "../models/Customer.js"

// create customer
export const createCustomer = async (req, res) => {
  const customer = req.body

  const newCustomer = new Customer(customer)
  try {
    await newCustomer.save()
    res.status(201).json(newCustomer)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

// get all customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find()
    res.status(200).json(customers)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// delete customer
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)

    try {
      await customer.delete()
      res.status(200).json("Customer has been deleted")
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
