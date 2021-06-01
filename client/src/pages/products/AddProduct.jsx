import { Container, makeStyles, Typography } from "@material-ui/core"
import { green } from "@material-ui/core/colors"
import axios from "axios"
import React, { useState } from "react"
import { useHistory } from "react-router"
import Add from "../../components/products/Add"
import useFetch from "../../composables/useFetch"

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: 20,
    marginBottom: 20,
    marginRight: theme.spacing(2)
  },
  grid: {
    marginRight: theme.spacing(1)
  }
}))

const AddProduct = () => {
  const classes = useStyles()
  const history = useHistory()
  const [productName, setProductName] = useState("")
  const [category, setCategory] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [cost, setCost] = useState("")
  const [brand, setBrand] = useState("")

  const { data: categories } = useFetch("/categories")

  const sale_price = price

  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {
      productName,
      category,
      quantity,
      sale_price,
      price,
      cost,
      brand
    }

    try {
      await axios
        .post("/products", product)
        .then(() => history.push("/products"))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Typography variant="h6">Add Product</Typography>
      <Add
        classes={classes}
        setProductName={setProductName}
        handleSubmit={handleSubmit}
        setCategory={setCategory}
        setBrand={setBrand}
        setQuantity={setQuantity}
        setPrice={setPrice}
        setCost={setCost}
        color={green}
        categories={categories}
      />
    </Container>
  )
}

export default AddProduct
