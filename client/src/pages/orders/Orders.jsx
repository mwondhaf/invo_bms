import { Container } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { DataGrid } from "@material-ui/data-grid"
import axios from "axios"
import api_url from "../../api/api"

const Orders = () => {
  const [orders, setOrders] = useState([])
  console.log(orders)

  useEffect(() => {
    const fetchOrders = async () => {
      await axios.get(`${api_url}/orders`).then((res) => {
        setOrders(res.data)
      })
    }
    fetchOrders()
  }, [])

  const columns = [
    // { field: "_id", headerName: "ID", width: 70 },
    { field: "order_id", headerName: "ORDER ID", width: 130 },
    { field: "customer_name", headerName: "CUSTOMER", width: 130 },
    {
      field: "customer_phone",
      headerName: "PHONE",
      width: 200
    },
    {
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160
    }
  ]

  return (
    <Container>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={orders}
          columns={columns}
          pageSize={7}
          checkboxSelection
        />
      </div>
    </Container>
  )
}

export default Orders
