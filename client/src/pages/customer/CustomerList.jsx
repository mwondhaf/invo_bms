import {
  Grid,
  makeStyles,
  Typography,
  Card,
  CardActions,
  CardContent,
  Snackbar,
  Button,
  Avatar,
  IconButton,
  CardHeader
} from "@material-ui/core"
import MuiAlert from "@material-ui/lab/Alert"
import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import api_url from "../../api/api"
import { UserMinus, Send } from "react-feather"
import { SearchContext } from "../../context/SearchContext"
import useSkipFirstRender from "../../composables/useSkipFirstRender"

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.2),
    border: "none",
    paddingBottom: "0px"
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
}))

const CustomerList = () => {
  const classes = useStyles()
  const [data, setData] = useState([])
  const [filteredCustomers, setFilteredCustomers] = useState(data)
  const [loading, setLoading] = useState(true)
  const [watchDelete, setWatchDelete] = useState(false)
  const [deleteAlert, setDeleteAlert] = useState(false)
  const [open, setOpen] = React.useState(false)
  const { setSearchPlaceHolder, searchText } = useContext(SearchContext)

  console.log("data", data)
  console.log(searchText)

  useSkipFirstRender(() => {
    const phone = parseInt(searchText)
    try {
      const result = data.filter((customer) => customer.phoneNumber === phone)
      if (result.length > 0) {
        setFilteredCustomers(result)
      } else {
        console.log("no orders found")
        setFilteredCustomers(data)
      }
    } catch (error) {
      console.log(error)
    }
  }, [searchText])

  // fetch customers
  useEffect(() => {
    setSearchPlaceHolder("Search customer...")
    let source = axios.CancelToken.source()
    const fetchCustomers = async () => {
      try {
        await axios
          .get(`${api_url}/customers`, { cancelToken: source.token })
          .then((res) => {
            setData(res.data)
            setFilteredCustomers(res.data)
            setLoading(false)
          })
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("fetch aborted")
        } else {
          throw error
        }
      }
    }
    fetchCustomers()
    return () => {
      source.cancel()
    }
  }, [watchDelete])

  // delete customer
  const handleDelete = (_id) => {
    axios.delete(`${api_url}/customers/${_id}`).then(() => {
      setWatchDelete(!watchDelete)
      setDeleteAlert("Deleted Successfully")
    })
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  return (
    <>
      <Grid item>
        <Typography
          variant="h5"
          style={{
            fontWeight: "900",
            color: "#2E3C42",
            paddingBottom: "10px"
            // paddingLeft: 10
          }}
        >
          Customers
        </Typography>
        {data && data.length > 0 && (
          <>
            <Grid container>
              {filteredCustomers
                .map((customer) => (
                  <Grid key={customer._id} item xs={12} sm={6} md={4}>
                    <Card
                      className={classes.root}
                      variant="outlined"
                      elevation={0}
                    >
                      <CardHeader
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            className={classes.avatar}
                          >
                            {customer.name.charAt(0).toUpperCase()}
                          </Avatar>
                        }
                        action={
                          <IconButton
                            aria-label="delete user"
                            onClick={() => {
                              handleDelete(customer._id)
                              setOpen(true)
                            }}
                          >
                            <UserMinus />
                          </IconButton>
                        }
                        title={customer.name}
                        subheader={`${customer.phoneNumber}   ${
                          customer.address ? customer.address : "No Address"
                        }`}
                      />
                      <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                      >
                        <Alert onClose={handleClose} severity="success">
                          {deleteAlert ? `${deleteAlert}` : "Deleting..."}
                        </Alert>
                      </Snackbar>
                      <CardActions>
                        <Button
                          color="primary"
                          startIcon={<Send size={10} />}
                          size="small"
                        >
                          Send Message
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
                .reverse()}
            </Grid>
          </>
        )}
      </Grid>
    </>
  )
}

export default CustomerList
