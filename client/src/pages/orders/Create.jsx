import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Fab,
  FormControl,
  Grid,
  Hidden,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
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
import NumberFormat from "react-number-format"

import api_url from "../../api/api"
import { CartContext } from "../../context/CartContext"
import { SignalCellularNullTwoTone } from "@material-ui/icons"
import { payment_methods } from "../../menuData/paymentMethods"
import { SearchContext } from "../../context/SearchContext"

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
    boxShadow: "none"
  },
  select_card: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
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
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220
  }
}))

const Create = () => {
  const classes = useStyles()
  const [cart, setCart, cartTotal, setCartTotal] = useContext(CartContext)

  const [customerFieldError, setCustomerFieldError] = useState(false)
  const [productFieldError, setProductFieldError] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [productPicker, setProductPicker] = useState(true)
  const [amountPaid, setAmountPaid] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("Cash")
  const [paymentStatus, setPaymentStatus] = useState("Paid")
  const [createOrder, setCreateOrder] = useState(false)
  const history = useHistory()

  const { setShowSearchBar } = useContext(SearchContext)
  const { data: customers } = useFetch(`${api_url}/customers`)
  const { data: products } = useFetch(`${api_url}/products`)

  // const order_pay_price_excess_notify = () => toast(`That's excess pay!..`)

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
    setShowSearchBar(false)
    setCartTotal(totalPrice)
    setAmountPaid(totalPrice)
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
      setProductPicker(!productPicker)
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
      setProductPicker(!productPicker)
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
    setCreateOrder(false)

    if (selectedCustomer && cart.length > 0 && amountPaid !== undefined) {
      // order
      const order = {
        customer_name: selectedCustomer.name,
        customer_phone: selectedCustomer.phoneNumber,
        customer_address: selectedCustomer.address,
        customer_email: selectedCustomer.email,
        customer_other_details: selectedCustomer.otherDetails,
        products: cart
      }

      // payment method
      order.payment_method = paymentMethod

      // discount
      order.total_discount = totalDiscount

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

      // total paid
      order.total_paid = amountPaid

      // total balance
      if (amountPaid === 0) {
        order.total_balance = prices_sum
        order.payment_status = "Not Paid"
      } else if (amountPaid < prices_sum && amountPaid !== 0) {
        order.total_balance = prices_sum - amountPaid
        order.payment_status = "Partial"
      } else {
        order.total_balance = 0
        order.payment_status = "Paid"
      }

      // real total before discount
      order.real_total = totalDiscount + totalPrice

      // payment status

      setCreateOrder(true)

      try {
        await axios.post(`${api_url}/orders`, order).then((res) => {
          setCart([])
          history.push(`/order/${res.data.order_id}`)
          console.log(res.data)
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
        <Typography
          variant="h5"
          style={{
            fontWeight: "900",
            color: "#2E3C42",
            // textAlign: "left",
            paddingBottom: "10px",
            paddingLeft: 10
          }}
        >
          Create Order
        </Typography>
        <Card elevation={0}>
          <Grid container>
            <Grid item xs={12} md={4} pb={1}>
              <Card classes={{ root: classes.select_card }}>
                <CardContent>
                  <Typography
                    variant="body1"
                    style={{
                      color: "#434546",
                      paddingBottom: "10px",
                      fontWeight: "300"
                      // textAlign: "center"
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
                              type="number"
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
                          {totalDiscount > 0 && (
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
                          )}
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
                          <Box display="flex">
                            <Box p={1} flexGrow={1}>
                              <Typography className={classes.total_font}>
                                Amount Paid:
                              </Typography>
                            </Box>
                            <Box p={1}>
                              <NumberFormat
                                key={productPicker}
                                helperText="hi"
                                style={{
                                  fontWeight: "900",
                                  // border: 0,
                                  fontSize: "16px",
                                  textAlign: "center",
                                  borderWidth: "0 0 1px",
                                  color: "green",
                                  borderColor: "f9f9f9",
                                  padding: 5
                                }}
                                onValueChange={(values) =>
                                  setAmountPaid(values.floatValue)
                                }
                                onBlur={(e) => {
                                  e.persist()
                                  e.target = { amountPaid }
                                }}
                                defaultValue={totalPrice}
                                displayType={"number"}
                                thousandSeparator={true}
                                prefix={"Ugx "}
                              />
                            </Box>
                          </Box>

                          {amountPaid < totalPrice ? (
                            <Box display="flex">
                              <Box p={1} flexGrow={1}>
                                <Typography className={classes.total_font}>
                                  Balance:
                                </Typography>
                              </Box>
                              <Box p={1}>
                                <Typography
                                  style={{
                                    fontWeight: "700",
                                    color: "orange",
                                    fontSize: 14
                                  }}
                                >
                                  {(totalPrice - amountPaid).toLocaleString(
                                    undefined,
                                    {
                                      maximumFractionDigits: 2
                                    }
                                  )}
                                </Typography>
                              </Box>
                            </Box>
                          ) : null}
                          <Box display="flex">
                            <Box flexGrow={1} p={1}>
                              <Typography className={classes.total_font}>
                                Payment Method:
                              </Typography>
                            </Box>
                            <Box p={1}>
                              <FormControl className={classes.formControl}>
                                {/* <InputLabel>Payment Method</InputLabel> */}
                                <Select
                                  defaultValue={"Cash"}
                                  size="small"
                                  // variant="outlined"
                                  fullWidth
                                  onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                  }
                                >
                                  <MenuItem value={"Cash"}>Cash</MenuItem>
                                  <MenuItem value={"Mobile Money"}>
                                    Mobile Money
                                  </MenuItem>
                                  <MenuItem value={"Cheque"}>Cheque</MenuItem>
                                  <MenuItem value={"Bank Deposit"}>
                                    Bank Deposit
                                  </MenuItem>
                                  <MenuItem value={"Bank Transfer"}>
                                    Bank Transfer
                                  </MenuItem>
                                </Select>
                              </FormControl>
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
                                disabled={
                                  amountPaid > totalPrice ? true : false
                                }
                                onClick={(e) => {
                                  handleSubmit(e)
                                }}
                              >
                                {createOrder ? "Creating" : "Create Order"}
                              </Button>
                            </Box>
                            <Box p={1}>
                              <Button
                                onClick={() => {
                                  setCart([])
                                  setProductFieldError("")
                                }}
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
        </Card>
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
