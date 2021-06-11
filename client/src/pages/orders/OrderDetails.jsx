import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography
} from "@material-ui/core"
import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { useHistory, useParams } from "react-router"
import api_url from "../../api/api"
import moment from "moment"

import { useReactToPrint } from "react-to-print"
import Invoice from "./Invoice"

const OrderDetails = () => {
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
            moment(res.data.createdAt).format("MMMM Do YYYY, h:mm a")
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
          ORDER ID - {id}
        </Typography>

        <Card elevation={0}>
          {orderDetails && (
            <>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Placed on: {dateCreated}
                </Typography>
                <hr />
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
                <hr />
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
                  <div key={product._id}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm container>
                        <Grid item xs>
                          <Typography
                            gutterBottom
                            variant="body2"
                            style={{ fontWeight: "700" }}
                          >
                            {product.productName}
                          </Typography>
                          <Typography
                            gutterBottom
                            color="textSecondary"
                            style={{
                              fontWeight: "700"
                            }}
                          >
                            UGX {product.price}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            QTY: {product.quantity_ordered} // each @{" "}
                            {product.sale_price}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider />
                  </div>
                ))}
                <Typography
                  gutterTop
                  gutterBottom
                  style={{
                    paddingTop: "10px",
                    fontWeight: "700",
                    color: "#2E3C42"
                  }}
                >
                  ORDER TOTALS - {orderDetails.payment_status}
                </Typography>
                <Typography color="textSecondary">
                  Payment Method: {orderDetails.payment_method}
                </Typography>
                <Typography color="textSecondary">
                  Payment Method: {orderDetails.payment_method}
                </Typography>
                {orderDetails.total_discount > 0 ? (
                  <Typography color="textSecondary">
                    Total Discount: {orderDetails.total_discount}
                  </Typography>
                ) : null}
                <Typography
                  style={{
                    fontWeight: "700"
                  }}
                  color="textSecondary"
                >
                  Total Price: {orderDetails.total_price}
                </Typography>
                <Typography
                  style={{
                    fontWeight: "700"
                  }}
                  color="textSecondary"
                >
                  Amount Paid: {orderDetails.total_paid}
                </Typography>
                {orderDetails.total_balance > 0 ? (
                  <Typography
                    gutterBottom
                    color="textSecondary"
                    style={{
                      fontWeight: "700"
                    }}
                  >
                    Balance: {orderDetails.total_balance}
                  </Typography>
                ) : null}

                <Typography
                  variant="body2"
                  style={{ paddingTop: "10px" }}
                  component="p"
                >
                  {'"Thank you for your order :) "'}
                </Typography>
              </CardContent>
              <CardActions>
                {/* <Button onClick={() => history.push(`/invoice/${id}`)}>
                  Invoice
                </Button> */}
                <Button onClick={handlePrint} size="small" variant="outlined">
                  PRINT
                </Button>
                <div style={{ display: "none" }}>
                  <Invoice refPropWithAnotherName={componentRef} />
                </div>
                <Button
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
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    history.push("/orders")
                  }}
                >
                  {"<"}
                </Button>
              </CardActions>
            </>
          )}
        </Card>
      </Grid>
    </div>
  )
}

export default OrderDetails
