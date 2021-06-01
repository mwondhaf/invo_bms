import { Container } from "@material-ui/core"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import TableTemplate from "../../components/TableTemplate"
import useFetch from "../../composables/useFetch"

const AllProducts = () => {
  const history = useHistory()
  const [products, setProducts] = useState([])
  const [watchDelete, setWatchDelete] = useState(false)

  // const { data, isPending } = useFetch("/products")

  useEffect(() => {
    const fetchProducts = async () => {
      axios.get("/products").then((res) => setProducts(res.data))
    }

    fetchProducts()
    // setProducts(data)
    // console.log("data", data)
  }, [watchDelete])

  const handleDelete = async (_id) => {
    try {
      await axios
        .delete(`/products/${_id}`)
        .then(() => setWatchDelete(!watchDelete))
    } catch (error) {
      console.log(error)
    }
  }

  const rowClick = (event, rowData) => {
    history.push({ pathname: "/productdetails", item: rowData })
  }

  const actions = [
    {
      icon: "edit",
      tooltip: "Edit",
      onClick: (event, rowData) => {
        history.push(`/product/edit/${rowData._id}`)
      }
    },
    {
      icon: "delete",
      tooltip: "Delete",
      onClick: (event, rowData) => handleDelete(rowData._id)
    }
  ]

  const columns = [
    {
      title: "Product ID",
      field: "_id",
      defaultSort: "desc",
      hidden: true
    },
    {
      title: "Product",
      field: "productName"
    },
    {
      title: "Category",
      field: "category"
    },
    {
      title: "Brand",
      field: "brand"
    },
    {
      title: "Sale Price (UGX)",
      field: "price",
      type: "currency",
      currencySetting: {
        currencyCode: "ugx",
        minimumFractionDigits: 0
      }
    }
  ]
  return (
    <Container>
      <TableTemplate
        actions={actions}
        title="All Products"
        columns={columns}
        data={products}
        rowClick={rowClick}
      />
    </Container>
  )
}

export default AllProducts
