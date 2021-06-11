import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import api_url from "../../api/api"
import moment from "moment"
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  invoice_id_font: {
    fontWeight: "700",
    color: "#2E3C42",
    paddingBottom: "10px",
    fontSize: "20px"
  },
  card_style: {
    display: "block",
    padding: "30px",
    // width: "726px",
    transitionDuration: "0.3s"
    // height: "1028px"
  }
}))

const Invoice = ({ refPropWithAnotherName }) => {
  const classes = useStyles()
  const [products, setProducts] = useState([])
  const { id } = useParams()
  const [orderDetails, setOrderDetails] = useState()
  const [dateCreated, setDateCreated] = useState()
  const history = useHistory()

  console.log(id)
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        await axios.get(`${api_url}/orders/${id}`).then((res) => {
          console.log("res", res.data)
          setOrderDetails(res.data)
          setProducts(res.data.products)
          setDateCreated(
            moment(res.data.createdAt).format("MMMM Do YYYY, h:mm a")
          )
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchOrderDetails()
  }, [])

  return (
    <div ref={refPropWithAnotherName} className={classes.root}>
      {orderDetails && (
        <Grid item xs={12}>
          <Card elevation={0} className={classes.card_style}>
            <CardContent>
              <Grid container>
                <Grid item xs={6} md={6}>
                  <Typography className={classes.invoice_id_font}>
                    INVOICE # {id}
                  </Typography>
                  <Typography
                    style={{ fontSize: "16px" }}
                    variant="h5"
                    color="textSecondary"
                  >
                    {dateCreated}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container style={{ paddingTop: "40px" }}>
                <Grid item xs={6} md={6}>
                  <Typography
                    color="textSecondary"
                    style={{ fontSize: "16px", fontWeight: "700" }}
                  >
                    BILL TO
                  </Typography>
                  <Typography style={{ fontSize: "18px", fontWeight: "700" }}>
                    {orderDetails.customer_name}
                  </Typography>
                  <Typography style={{ fontSize: "16px" }}>
                    {orderDetails.customer_address}
                  </Typography>
                  <Typography style={{ fontSize: "16px" }}>
                    {orderDetails.customer_phone}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Box display="flex" justifyContent="flex-end">
                    <Box>
                      <Typography
                        color="textSecondary"
                        style={{ fontSize: "16px", fontWeight: "700" }}
                      >
                        SELLER
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "18px",
                          fontWeight: "700"
                        }}
                      >
                        Business Name
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "16px"
                        }}
                      >
                        Kampala
                      </Typography>
                      <Typography style={{ fontSize: "16px" }}>
                        TIN: 39393939393
                      </Typography>
                      <Typography style={{ fontSize: "16px" }}>
                        077777
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Grid container style={{ paddingTop: "40px" }}>
                <Grid item xs={4}>
                  <Typography
                    color="textSecondary"
                    style={{ fontWeight: "700", fontSize: "16px" }}
                  >
                    ITEM
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    align="right"
                    color="textSecondary"
                    style={{ fontWeight: "700", fontSize: "16px" }}
                  >
                    PRICE
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    align="right"
                    color="textSecondary"
                    style={{ fontWeight: "700", fontSize: "16px" }}
                  >
                    QTY
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    color="textSecondary"
                    style={{ fontWeight: "700", fontSize: "16px" }}
                    align="right"
                  >
                    TOTAL
                  </Typography>
                </Grid>
              </Grid>

              <Divider />
              {products.map((product) => (
                <div key={product._id}>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography style={{ fontSize: "16px" }}>
                        {product.productName}
                      </Typography>
                      <Typography style={{ fontSize: "12px" }}>
                        {product.category}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography align="right" style={{ fontSize: "16px" }}>
                        {product.sale_price}
                        <Typography style={{ fontSize: "12px" }}>
                          Original Price: {product.price}
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography align="right" style={{ fontSize: "16px" }}>
                        {product.quantity_ordered}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography align="right" style={{ fontSize: "16px" }}>
                        {product.sale_price * product.quantity_ordered}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider />
                </div>
              ))}

              <Grid container style={{ paddingTop: "40px" }}>
                <Grid item xs={6}>
                  <Typography
                    color="textSecondary"
                    style={{ fontSize: "16px" }}
                  >
                    ORDER NOTES:
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={7}>
                      <Typography style={{ fontSize: "16px" }} align="right">
                        Payment Method:
                      </Typography>
                      <Typography align="right">Payment Status : </Typography>
                      {orderDetails.total_discount > 0 ? (
                        <Typography align="right">Total Discount : </Typography>
                      ) : null}
                      <Typography align="right">Vat : </Typography>
                      <Typography align="right">Total Price : </Typography>
                      <Typography align="right">Total Paid : </Typography>
                      {orderDetails.total_balance > 0 ? (
                        <Typography align="right">Total Balance : </Typography>
                      ) : null}
                    </Grid>
                    <Grid item xs={5}>
                      <Typography align="right" style={{ fontWeight: "400" }}>
                        {orderDetails.payment_method}
                      </Typography>
                      <Typography align="right" style={{ fontWeight: "400" }}>
                        {orderDetails.payment_status}
                      </Typography>
                      {orderDetails.total_discount > 0 ? (
                        <Typography align="right" style={{ fontWeight: "400" }}>
                          {orderDetails.total_discount}
                        </Typography>
                      ) : null}
                      <Typography align="right" style={{ fontWeight: "400" }}>
                        {(18 / 100) * orderDetails.total_price}
                      </Typography>
                      <Typography align="right" style={{ fontWeight: "400" }}>
                        {orderDetails.total_price}
                      </Typography>
                      <Typography align="right" style={{ fontWeight: "400" }}>
                        {orderDetails.total_paid}
                      </Typography>
                      {orderDetails.total_balance > 0 ? (
                        <Typography align="right" style={{ fontWeight: "400" }}>
                          {orderDetails.total_balance}
                        </Typography>
                      ) : null}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}
    </div>
  )
}

export default Invoice
