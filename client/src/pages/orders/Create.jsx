import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography
} from "@material-ui/core"
import React, { useContext, useState } from "react"
import { useHistory } from "react-router"
import Autocomplete from "@material-ui/lab/Autocomplete"
import useFetch from "../../composables/useFetch"

import axios from "axios"
import api_url from "../../api/api"
import { CartContext } from "../../context/CartContext"

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: 5,
    marginBottom: 5,
    marginRight: theme.spacing(1),
    display: "block"
  },
  container_item: {
    padding: 5,

    marginTop: 5
  }
}))

const Create = () => {
  const classes = useStyles()
  const [cart, setCart, cartTotal, setCartTotal] = useContext(CartContext)

  const [customerFieldError, setCustomerFieldError] = useState(false)
  const [productFieldError, setProductFieldError] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const history = useHistory()
  const { data: customers } = useFetch(`${api_url}/customers`)
  const { data: products } = useFetch(`${api_url}/products`)

  console.log("cart", cart)

  const totalPrice = cart.reduce(
    (acc, current) => acc + current.sale_price * current.quantity_ordered,
    0
  )
  setCartTotal(totalPrice)

  const setSalesPrice = (e, product) => {
    const newPrice = e.target.value
    let new_price = parseFloat(newPrice)

    const exist = cart.find((item) => item._id === product._id)

    if (exist) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? {
                ...exist,
                old_price: exist.price,
                sale_price: new_price
              }
            : item
        )
      )
    }
  }

  const setOrderQuantity = (e, product) => {
    const newQuantity = e.target.value
    let new_qty = parseFloat(newQuantity)

    const exist = cart.find((item) => item._id === product._id)

    if (exist) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...exist, quantity_ordered: new_qty }
            : item
        )
      )
    }
  }

  const AddToCart = (e, value) => {
    if (value) {
      // find if product already exists
      const exist = cart.find((product) => product._id === value._id)

      if (exist) {
        setCart(
          cart.map((product) =>
            product._id === value._id
              ? { ...exist, quantity_ordered: exist.quantity_ordered + 1 }
              : product
          )
        )
      } else {
        setCart([...cart, { ...value, quantity_ordered: 1 }])
      }
    }
  }

  const handleRemoveItemSelected = (product) => {
    const newProducts = cart.filter((item) => item._id !== product._id)
    setCart(newProducts)
    // const newProducts = selectedProducts.find()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCustomerFieldError(false)
    setProductFieldError(false)

    if (selectedCustomer && cart.length > 0) {
      // order
      const order = {
        customer_name: selectedCustomer.name,
        customer_phone: selectedCustomer.phoneNumber,
        customer_address: selectedCustomer.address,
        // order_id: Math.floor(Math.random() * 10000),
        products: cart
      }

      // product prices
      const prices = []
      order.products.map((product) => {
        const price =
          parseFloat(product.sale_price) * parseFloat(product.quantity_ordered)
        prices.push(price)
      })

      // total of prices
      const prices_sum = prices.reduce((a, b) => a + b, 0)
      order.total_price = prices_sum
      setCartTotal(prices_sum)

      try {
        await axios.post(`${api_url}/orders`, order).then((res) => {
          console.log(res)
          localStorage.setItem("order", res.data.order_id)
          history.push(`/checkout/${res.data.order_id}`)
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      setCustomerFieldError(true)
      setProductFieldError(true)
    }
  }

  return (
    <>
      <Grid item xs={12} md={6}>
        <Box mt={-15}>
          <Card>
            <CardContent style={{ marginTop: 10 }}>
              <Typography
                variant="h5"
                style={{ fontWeight: "900", color: "#2E3C42" }}
              >
                Create Order - {cartTotal}
              </Typography>
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Autocomplete
                  size="small"
                  id="combo-box-demo"
                  className={classes.field}
                  options={customers}
                  getOptionSelected={(option, value) => option.id === value.id}
                  getOptionLabel={(option) =>
                    `${option.name} - ${option.phoneNumber}`
                  }
                  onChange={(e, value) => setSelectedCustomer(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select customer"
                      inputProps={{
                        ...params.inputProps
                      }}
                      required={true}
                      variant="outlined"
                      error={customerFieldError}
                    />
                  )}
                />
                {products && (
                  <>
                    <Autocomplete
                      size="small"
                      id="combo-box-products"
                      className={classes.field}
                      options={products}
                      getOptionSelected={(option, value) =>
                        option.id === value.id
                      }
                      getOptionLabel={(option) =>
                        `${option.productName} - ${option.price}`
                      }
                      onChange={(e, value) => AddToCart(e, value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select product"
                          required
                          variant="outlined"
                          error={productFieldError}
                        />
                      )}
                    />
                  </>
                )}
              </form>
            </CardContent>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box mt={1}>
          {cart.map((product) => (
            <div>
              <Grid
                style={{ paddingTop: 15 }}
                container
                key={Math.floor(Math.random() * 1000)}

                // className={classes.container_item}
              >
                <Grid item xs={12} md={3}>
                  <Typography
                    variant="h6"
                    style={{ fontWeight: "700", color: "f9f9f9" }}
                  >
                    {product.productName} @
                    {product.quantity_ordered * product.sale_price}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={2}>
                  <TextField
                    className={classes.field}
                    defaultValue={product.quantity_ordered}
                    onBlur={(e) => {
                      setOrderQuantity(e, product)
                    }}
                    label="Quantity"
                    type="number"
                    size="small"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    className={classes.field}
                    label="Unit Price"
                    variant="outlined"
                    size="small"
                    defaultValue={product.price}
                    disabled
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Grid>
                <Grid item xs={6} md={2}>
                  <TextField
                    size="small"
                    label="Selling Price / Unit"
                    className={classes.field}
                    variant="outlined"
                    defaultValue={product.sale_price}
                    onBlur={(e) => {
                      setSalesPrice(e, product)
                    }}
                  />
                </Grid>
                <Grid item xs={6} md={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="medium"
                    className={classes.field}
                    disableElevation
                    onClick={() => handleRemoveItemSelected(product)}
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
              <Divider />
            </div>
          ))}
        </Box>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="large"
            fullWidth
            onClick={handleSubmit}
          >
            Create Order
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default Create
