import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import api_url from "../../api/api"

const CheckOut = () => {
  const [orderDetails, setOrderDetails] = useState()
  const [products, setProducts] = useState([])
  console.log(products)

  console.log("order", orderDetails)

  const params = useParams()

  useEffect(() => {
    const order_id = params.id
    const fetchOrderDetails = async () => {
      await axios.get(`${api_url}/orders/${order_id}`).then((res) => {
        console.log("res", res.data)
        setOrderDetails(res.data)
        setProducts(res.data.products)
      })
    }
    fetchOrderDetails()
  }, [])

  return (
    <div>
      <div>
        <h4>Hi, this part is coming banaye :)</h4>
      </div>
      {orderDetails && (
        <div>
          <div>
            {products && (
              <div>
                {products.map((product) => (
                  <div key={product._id}>
                    {product.productName} - {product.sale_price} *
                    {product.quantity_ordered}
                    Sub-total: {product.sale_price * product.quantity_ordered}
                  </div>
                ))}
              </div>
            )}
          </div>
          <h5>Total: {orderDetails.total_price}</h5>
        </div>
      )}

      {/* {orderProducts &&
        orderProducts.map((order) => <div key={order._id}>{order}</div>)} */}
    </div>
  )
}

export default CheckOut
