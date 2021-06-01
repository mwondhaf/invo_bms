import { SettingsSystemDaydream } from "@material-ui/icons"
import React, { useEffect, useState } from "react"
import { useHistory, useLocation, useParams } from "react-router"
import Add from "../../components/products/Add"
import useFetch from "../../composables/useFetch"

const ProductDetails = () => {
  const location = useLocation()
  const history = useHistory()
  const [product, setProduct] = useState()
  console.log(product)

  useEffect(() => {
    if (!location.item) {
      history.go(-1)
    } else {
      const id = location.item.id
      const url = "http://localhost:8000/products/" + id

      fetch(url)
        .then((res) => res.json())
        .then((data) => setProduct(data))
    }
  }, [])

  return (
    <div>{product ? <div>{product.productName}</div> : <div>hello</div>}</div>
  )
}

export default ProductDetails
