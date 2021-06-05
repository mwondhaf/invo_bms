import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Fab,
  Grid,
  Hidden,
  makeStyles,
  Paper,
  TextField,
  Typography
} from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import Autocomplete from "@material-ui/lab/Autocomplete"
import useFetch from "../../composables/useFetch"
import NavigationIcon from "@material-ui/icons/Navigation"
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep"
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty"
import axios from "axios"
import api_url from "../../api/api"
import { CartContext } from "../../context/CartContext"

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: 5,
    marginBottom: 5,
    marginRight: theme.spacing(1),
    display: "block",
    fontSize: "12px"
  },
  resize: {
    fontSize: 12
  },
  total_font: {
    fontSize: 14,
    fontWeight: "900"
  },
  container_item: {
    padding: 5,
    marginTop: 5
  },
  product_card: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    minHeight: "30vw",
    // backgroundColor: theme.palette.primary.light,
    // color: theme.palette.primary.contrastText,
    boxShadow: "none"
  },
  select_card: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    // backgroundColor: theme.palette.primary.light,
    // color: theme.palette.primary.contrastText,
    boxShadow: "none"
  },
  place_holder_card: {
    boxShadow: "none"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  mark: {
    backgroundColor: "#f7f7f7",
    color: "#f7f7f7",
    fontSize: 14,
    fontWeight: "900"
  }
}))

const Create = () => {
  const classes = useStyles()
  const [cart, setCart, cartTotal, setCartTotal] = useContext(CartContext)

  const [customerFieldError, setCustomerFieldError] = useState(false)
  const [productFieldError, setProductFieldError] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [productPicker, setProductPicker] = useState(true)

  const history = useHistory()
  const { data: customers } = useFetch(`${api_url}/customers`)
  const { data: products } = useFetch(`${api_url}/products`)

  console.log("cart", cart)

  const totalPrice = cart.reduce(
    (acc, current) => acc + current.sale_price * current.quantity_ordered,
    0
  )
  const totalDiscount = cart.reduce(
    (acc, current) =>
      acc + (current.price - current.sale_price) * current.quantity_ordered,
    0
  )
  useEffect(() => {
    setCartTotal(totalPrice)
  }, [cart])

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

      if (!exist) {
        setProductFieldError("")
        // setCart(
        //   cart.map((product) =>
        //     product._id === value._id
        //       ? { ...exist, quantity_ordered: exist.quantity_ordered + 1 }
        //       : product
        //   )
        // )
        setCart([...cart, { ...value, quantity_ordered: 1 }])
      } else {
        const canVibrate = window.navigator.vibrate
        if (canVibrate) window.navigator.vibrate(200)
        setProductFieldError(
          `Already added ${value.productName}, increase quantity instead `
        )
      }
    }
  }

  const handleRemoveItemSelected = (product) => {
    const newProducts = cart.filter((item) => item._id !== product._id)
    setCart(newProducts)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCustomerFieldError(false)

    if (selectedCustomer && cart.length > 0) {
      // order
      const order = {
        customer_name: selectedCustomer.name,
        customer_phone: selectedCustomer.phoneNumber,
        customer_address: selectedCustomer.address,
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
    }
  }

  return (
    <>
      <Grid item xs={12} md={"none"}>
        <Box mt={-15}>
          <Grid container>
            <Grid item xs={12} md={4} pb={1}>
              <Card classes={{ root: classes.select_card }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    style={{
                      fontWeight: "900",
                      color: "#2E3C42",
                      textAlign: "center",
                      paddingBottom: "10px"
                    }}
                  >
                    Create Order
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      color: "#434546",
                      paddingBottom: "10px",
                      fontWeight: "300",
                      textAlign: "center"
                    }}
                  >
                    Select a customer and products and then make an order.
                  </Typography>
                  <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Autocomplete
                      size="small"
                      id="combo-box-demo"
                      className={classes.field}
                      options={customers}
                      getOptionSelected={(option, value) =>
                        option.id === value.id
                      }
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
                          key={productPicker}
                          id="combo-box-products"
                          className={classes.field}
                          options={products}
                          getOptionSelected={(option, value) =>
                            option.id === value.id
                          }
                          getOptionLabel={(option) =>
                            `${option.productName} - ${option.price}`
                          }
                          onChange={(e, value) => {
                            AddToCart(e, value)
                            setProductPicker(!productPicker)
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select product"
                              variant="outlined"
                            />
                          )}
                        />
                        <Typography style={{ color: "orange", fontSize: 12 }}>
                          {productFieldError}
                        </Typography>
                      </>
                    )}
                  </form>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card classes={{ root: classes.product_card }}>
                <CardContent>
                  {cart.length < 1 && (
                    <Grid container justify="center" mt={10}>
                      <Grid item alignItems="center">
                        <HourglassEmptyIcon
                          style={{
                            fontSize: 150,
                            textAlign: "center",
                            color: "#f7f7f7"
                          }}
                        />
                      </Grid>
                    </Grid>
                  )}

                  {cart
                    .map((product) => (
                      <Box pt={2.5} key={Math.floor(Math.random() * 1000)}>
                        <Grid container>
                          <Grid item xs={12} md={3}>
                            <Typography
                              variant="h6"
                              style={{
                                fontWeight: "700",
                                fontSize: "12px",
                                color: "green"
                              }}
                            >
                              {product.productName} @
                              {(
                                product.quantity_ordered * product.sale_price
                              ).toLocaleString(undefined, {
                                maximumFractionDigits: 2
                              })}
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
                              InputProps={{
                                classes: {
                                  input: classes.resize
                                }
                              }}
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
                                readOnly: true,
                                classes: {
                                  input: classes.resize
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={6} md={2}>
                            <TextField
                              size="small"
                              label="Selling / Unit"
                              className={classes.field}
                              variant="outlined"
                              defaultValue={product.sale_price}
                              onBlur={(e) => {
                                setSalesPrice(e, product)
                              }}
                              InputProps={{
                                classes: {
                                  input: classes.resize
                                }
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
                      </Box>
                    ))
                    .reverse()}

                  {cart.length < 1 ? (
                    <Hidden only={["sm", "lg"]}>
                      <Box display="flex" justifyContent="flex-end" pt={5}>
                        <Grid item xs={12} md={6}>
                          <Card className={classes.place_holder_card}>
                            <Box display="flex">
                              <Box p={1}>
                                <Typography className={classes.mark}>
                                  Discount
                                </Typography>
                              </Box>

                              <Box p={1}>
                                {totalDiscount >= 0 && (
                                  <Typography className={classes.mark}>
                                    {totalDiscount.toLocaleString(undefined, {
                                      maximumFractionDigits: 2
                                    })}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                            <Box display="flex">
                              <Box p={1} flexGrow={1}>
                                <Typography className={classes.mark}>
                                  Tax: VAT 18%
                                </Typography>
                              </Box>
                              <Box p={1}>
                                <Typography className={classes.mark}>
                                  {((18 / 100) * totalPrice).toLocaleString(
                                    undefined,
                                    {
                                      maximumFractionDigits: 2
                                    }
                                  )}
                                </Typography>
                              </Box>
                            </Box>
                            <Box display="flex">
                              <Box p={1} flexGrow={1}>
                                <Typography className={classes.mark}>
                                  Total:
                                </Typography>
                              </Box>
                              <Box p={1}>
                                <Typography className={classes.mark}>
                                  {totalPrice.toLocaleString(undefined, {
                                    maximumFractionDigits: 2
                                  })}
                                </Typography>
                              </Box>
                            </Box>
                            <Box p={1} display="flex">
                              <Box flexGrow={1} p={1}>
                                <Box bgcolor="#f7f7f7" p={1.5}>
                                  <Typography className={classes.mark}>
                                    CREATE ORDER
                                  </Typography>
                                </Box>
                              </Box>
                              <Box p={1}>
                                <Box bgcolor="#f7f7f7" p={1.5}>
                                  <Typography className={classes.mark}>
                                    ORDER
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </Card>
                        </Grid>
                      </Box>
                    </Hidden>
                  ) : (
                    <Box display="flex" justifyContent="flex-end">
                      <Grid item xs={12} md={6}>
                        <Card>
                          <Box display="flex">
                            <Box p={1} flexGrow={1}>
                              <Typography className={classes.total_font}>
                                Discount:
                              </Typography>
                            </Box>
                            <Box p={1}>
                              {totalDiscount >= 0 && (
                                <Typography className={classes.total_font}>
                                  {totalDiscount.toLocaleString(undefined, {
                                    maximumFractionDigits: 2
                                  })}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                          <Box display="flex">
                            <Box p={1} flexGrow={1}>
                              <Typography className={classes.total_font}>
                                Tax: VAT 18%
                              </Typography>
                            </Box>
                            <Box p={1}>
                              <Typography className={classes.total_font}>
                                {((18 / 100) * totalPrice).toLocaleString(
                                  undefined,
                                  {
                                    maximumFractionDigits: 2
                                  }
                                )}
                              </Typography>
                            </Box>
                          </Box>
                          <Box display="flex">
                            <Box p={1} flexGrow={1}>
                              <Typography className={classes.total_font}>
                                Total:
                              </Typography>
                            </Box>
                            <Box p={1}>
                              <Typography className={classes.total_font}>
                                {totalPrice.toLocaleString(undefined, {
                                  maximumFractionDigits: 2
                                })}
                              </Typography>
                            </Box>
                          </Box>
                          <Box p={1} display="flex">
                            <Box flexGrow={1} p={1}>
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
                            </Box>
                            <Box p={1}>
                              <Button
                                onClick={() => setCart([])}
                                size="large"
                                variant="outlined"
                                color="secondary"
                                startIcon={<DeleteSweepIcon />}
                              />
                            </Box>
                          </Box>
                        </Card>
                      </Grid>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* <Grid container>
        <Grid item xs={12} md={3}>
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
      </Grid> */}
    </>
  )
}

export default Create
