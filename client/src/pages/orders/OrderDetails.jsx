import {
  Box,
  Button,
  Card,
  ButtonGroup,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography
} from "@material-ui/core"
import axios from "axios"
import React, { useContext, useEffect, useRef, useState } from "react"
import { useHistory, useParams } from "react-router"
import api_url from "../../api/api"
import moment from "moment"

import { useReactToPrint } from "react-to-print"
import Invoice from "./Invoice"

import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import ButtonBase from "@material-ui/core/ButtonBase"
import PrintIcon from "@material-ui/icons/Print"
import EditAttributesIcon from "@material-ui/icons/EditAttributes"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import { blue, green } from "@material-ui/core/colors"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import { HeaderContext } from "../../context/HeaderContext"
import ShareIcon from "@material-ui/icons/Share"
import WhatsAppIcon from "@material-ui/icons/WhatsApp"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    paddingTop: 0,
    margin: "auto",
    maxWidth: 500
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
}))

const OrderDetails = () => {
  const [showHeader, setShowHeader] = useContext(HeaderContext)
  const classes = useStyles()
  const { id } = useParams()
  const [orderDetails, setOrderDetails] = useState()
  const [products, setProducts] = useState([])
  const [dateCreated, setDateCreated] = useState()
  const history = useHistory()
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        await axios.get(`${api_url}/orders/${id}`).then((res) => {
          console.log("res", res.data)
          setOrderDetails(res.data)
          setProducts(res.data.products)
          setDateCreated(
            moment(res.data.createdAt).format("MMMM Do YYYY, h:mm A")
          )
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchOrderDetails()
  }, [])

  const handleDelete = async (id) => {
    console.log(id)
    try {
      await axios.delete(`${api_url}/orders/${id}`).then((res) => {
        history.push("/")
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Grid item xs={12}>
        <Box pb={2}>
          <Grid container justify="center">
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Typography
                  variant="h6"
                  style={{
                    fontWeight: "900",
                    color: "#2E3C42",
                    // textAlign: "left",
                    paddingBottom: "10px",
                    paddingLeft: 10
                  }}
                >
                  ORDER ID - {id}
                </Typography>
                <WhatsAppIcon
                  onClick={() =>
                    window.open(
                      `https://wa.me/${orderDetails.customer_phone}?text=${window.location.href}`
                    )
                  }
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Card elevation={0}>
          {orderDetails && (
            <>
              <CardContent>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <Typography color="textSecondary" gutterBottom>
                      Placed on: {dateCreated}
                    </Typography>
                    <Divider />
                    <Typography
                      gutterBottom
                      style={{
                        fontWeight: "700",
                        color: "#2E3C42"
                      }}
                    >
                      CUSTOMER DETAILS
                    </Typography>
                    <Typography color="textSecondary">
                      {orderDetails.customer_name}
                    </Typography>
                    <Typography color="textSecondary">
                      {orderDetails.customer_address}
                    </Typography>
                    <Typography color="textSecondary">
                      {orderDetails.customer_phone}
                    </Typography>
                    <Divider />
                    <Typography
                      gutterBottom
                      style={{
                        fontWeight: "700",
                        color: "#2E3C42"
                      }}
                    >
                      ORDER SUMMARY
                    </Typography>
                    {products.map((product) => (
                      <div key={product._id} className={classes.root}>
                        <Paper
                          className={classes.paper}
                          elevation={0}
                          gutterBottom
                        >
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm container>
                              <Grid
                                item
                                xs
                                container
                                direction="column"
                                spacing={2}
                              >
                                <Grid item xs>
                                  <Typography gutterBottom variant="subtitle1">
                                    {product.productName}
                                  </Typography>
                                  <Typography variant="body2" gutterBottom>
                                    Qty: {product.quantity_ordered} • each @
                                    {product.sale_price.toLocaleString()}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    {product.brand} {product.category}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Typography variant="subtitle1">
                                  {(
                                    product.sale_price *
                                    product.quantity_ordered
                                  ).toLocaleString()}
                                  /=
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Divider />
                        </Paper>
                      </div>
                    ))}
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <div className={classes.root}>
                      <Paper
                        className={classes.paper}
                        elevation={0}
                        gutterBottom
                      >
                        <Typography
                          gutterTop
                          gutterBottom
                          style={{
                            paddingTop: "10px",
                            fontWeight: "700",
                            color: "#2E3C42"
                          }}
                        >
                          ORDER TOTALS
                        </Typography>
                        <Divider />
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography color="textSecondary">
                              Payment Method :
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right" color="textSecondary">
                              {orderDetails.payment_method}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography color="textSecondary">
                              Payment Status :
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right" color="textSecondary">
                              {orderDetails.payment_status}
                            </Typography>
                          </Grid>
                          {orderDetails.total_discount > 0 ? (
                            <>
                              <Grid item xs={6}>
                                <Typography color="textSecondary">
                                  Total Discount :
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography align="right" color="textSecondary">
                                  {orderDetails.total_discount.toLocaleString()}
                                </Typography>
                              </Grid>
                            </>
                          ) : null}
                          <Grid item xs={6}>
                            <Typography color="textSecondary">VAT :</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right" color="textSecondary">
                              {(
                                (18 / 100) *
                                orderDetails.total_price
                              ).toLocaleString()}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography color="textSecondary">
                              Total Price :
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right" color="textSecondary">
                              {orderDetails.total_price.toLocaleString()}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography color="textSecondary">
                              Total Paid :
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right" color="textSecondary">
                              {orderDetails.total_paid.toLocaleString()}
                            </Typography>
                          </Grid>
                          {orderDetails.total_balance > 0 ? (
                            <>
                              <Grid item xs={6}>
                                <Typography color="textSecondary">
                                  Balance :
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography align="right" color="textSecondary">
                                  {orderDetails.total_balance.toLocaleString()}
                                </Typography>
                              </Grid>
                            </>
                          ) : null}
                        </Grid>

                        <Typography
                          variant="body2"
                          style={{ paddingTop: "10px" }}
                          component="p"
                        >
                          {'"Thank you for your order :) "'}
                        </Typography>
                      </Paper>
                      <CardActions>
                        <>
                          <Button
                            onClick={handlePrint}
                            startIcon={<PrintIcon />}
                          />
                          <Button
                            onClick={() => handleDelete(id)}
                            color="secondary"
                            startIcon={<DeleteForeverIcon />}
                          />
                          <Button
                            style={{ color: blue[500] }}
                            startIcon={<EditAttributesIcon />}
                          >
                            EDIT
                          </Button>

                          <Button
                            onClick={() => history.push("/create")}
                            style={{ color: green[500] }}
                            endIcon={<AddCircleOutlineIcon />}
                          ></Button>
                        </>
                        {/* <Button onClick={() => history.push(`/invoice/${id}`)}>
                  Invoice
                </Button> */}
                        {/* <Button
                            onClick={handlePrint}
                            size="small"
                            variant="outlined"
                          >
                            PRINT
                          </Button> */}
                        <div style={{ display: "none" }}>
                          <Invoice refPropWithAnotherName={componentRef} />
                        </div>
                        {/* <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleDelete(id)}
                          >
                            DELETE ORDER
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => history.push("/create")}
                          >
                            NEW
                          </Button> */}
                        {/* <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              history.push("/orders")
                            }}
                          >
                            {"<"}
                          </Button> */}
                      </CardActions>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </>
          )}
        </Card>
      </Grid>
    </div>
  )
}

export default OrderDetails
