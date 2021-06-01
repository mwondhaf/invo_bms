import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { useHistory, useLocation } from "react-router"
import { Link } from "react-router-dom"

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
})

const ProductDetail = () => {
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()
  const [product, setProduct] = useState()

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

  const handleDelete = (id) => {
    fetch("http://localhost:8000/products/" + id, {
      method: "DELETE"
    }).then(() => {
      history.push("/")
    })
  }

  const bull = <span className={classes.bullet}>•</span>

  return (
    <div>
      {product ? (
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {product.category}
            </Typography>
            <Typography variant="h5" component="h2">
              {product.productName}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {product.brand}
            </Typography>
            <Typography variant="body2" component="p">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => {
                history.push(`/product/edit/${product.id}`)
              }}
              size="small"
              color="primary"
              variant="outlined"
            >
              Edit PRODUCT
            </Button>
            <Button
              onClick={() => handleDelete(product.id)}
              size="small"
              color="secondary"
              variant="outlined"
            >
              DELETE PRODUCT
            </Button>
          </CardActions>
        </Card>
      ) : null}
    </div>
  )
}
export default ProductDetail
