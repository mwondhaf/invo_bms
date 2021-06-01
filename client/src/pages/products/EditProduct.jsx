import {
  Button,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useHistory, useLocation, useParams } from "react-router"
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

const EditProduct = () => {
  const classes = useStyles()
  const history = useHistory()

  const location = useLocation()
  const path = location.pathname.split("/")[3]

  const { data: product, error, isPending } = useFetch(`/products/${path}`)

  const [productName, setProductName] = useState(product.productName)
  const [category, setCategory] = useState(product.category)
  const [quantity, setQuantity] = useState(product.quantity)
  const [price, setPrice] = useState(product.price)
  const [cost, setCost] = useState(product.cost)
  const [brand, setBrand] = useState(product.brand)

  const handleEdit = (e) => {
    e.preventDefault()

    const newDetails = { productName, category, quantity, price, cost, brand }

    const updateProduct = async () => {
      await axios
        .put(`/products/${product._id}`, newDetails)
        .then(() =>
          history.push({ pathname: "/productdetails", item: product })
        )
    }

    updateProduct()
  }

  return (
    <div>
      {isPending && <div>Loading...</div>}
      {product && (
        <div>
          <Typography variant="h5">Edit Product</Typography>
          <Grid container>
            <Grid item sm={12} md={12} lg={8}>
              {Object.keys(product).length && (
                <form onSubmit={handleEdit}>
                  <Grid container>
                    <Grid item md={5} className={classes.grid}>
                      <TextField
                        className={classes.field}
                        variant="outlined"
                        size="small"
                        label="Product Name"
                        required
                        fullWidth
                        defaultValue={product.productName}
                        onChange={(e) => setProductName(e.target.value)}
                      />
                      <TextField
                        className={classes.field}
                        variant="outlined"
                        size="small"
                        label="Category"
                        required
                        defaultValue={product.category}
                        fullWidth
                        onChange={(e) => setCategory(e.target.value)}
                      />
                      <TextField
                        className={classes.field}
                        variant="outlined"
                        size="small"
                        label="Quantity"
                        required
                        fullWidth
                        defaultValue={product.quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        className={classes.field}
                        variant="outlined"
                        size="small"
                        label="Sale Price"
                        required
                        defaultValue={product.price}
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      <TextField
                        className={classes.field}
                        variant="outlined"
                        size="small"
                        label="Product Cost"
                        required
                        type="number"
                        defaultValue={product.cost}
                        onChange={(e) => setCost(e.target.value)}
                      />
                      <TextField
                        className={classes.field}
                        variant="outlined"
                        size="small"
                        label="Brand"
                        defaultValue={product.brand}
                        onChange={(e) => setBrand(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Button variant="contained" color="primary" type="submit">
                    save changes
                  </Button>
                </form>
              )}
            </Grid>
            <Grid item sm={12} md={12} lg={4}></Grid>
          </Grid>
        </div>
      )}
    </div>
  )
}

export default EditProduct
