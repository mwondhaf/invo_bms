import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Input,
  InputAdornment,
  InputBase,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core"
import React, { useContext, useEffect, useRef, useState } from "react"
import { DataGrid } from "@material-ui/data-grid"
import axios from "axios"
import moment from "moment"
import api_url from "../../api/api"
import IconButton from "@material-ui/core/IconButton"
import DoneIcon from "@material-ui/icons/Done"
import MailIcon from "@material-ui/icons/Mail"
import CachedIcon from "@material-ui/icons/Cached"
import Badge from "@material-ui/core/Badge"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import InfoIcon from "@material-ui/icons/Info"
import DirectionsIcon from "@material-ui/icons/Directions"
import { green, orange, red } from "@material-ui/core/colors"
import { AccountCircle } from "@material-ui/icons"
import Alert from "@material-ui/lab/Alert"
import HdrWeakIcon from "@material-ui/icons/HdrWeak"
import TripOriginIcon from "@material-ui/icons/TripOrigin"
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline"
import { Link } from "react-router-dom"
import Backdrop from "@material-ui/core/Backdrop"
import CircularProgress from "@material-ui/core/CircularProgress"
import { SearchContext } from "../../context/SearchContext"
import useFetch from "../../composables/useFetch"
import useSkipFirstRender from "../../composables/useSkipFirstRender"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: "5px"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  deleteIcon: {
    color: red,
    cursor: "pointer"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
}))

const Orders = () => {
  const classes = useStyles()
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState(orders)
  const [orderDeleted, setOrderDeleted] = useState(false)
  const [searchError, setSearchError] = useState(false)
  const [query, setQuery] = useState("")
  const [isLoadingOrders, setIsLoadingOrders] = useState(false)

  const [searchPlaceHolder, setSearchPlaceHolder, searchText, setSearchText] =
    useContext(SearchContext)

  useSkipFirstRender(() => {
    try {
      const result = orders.filter((order) => order.order_id === searchText)
      console.log(result)
      if (result.length > 0) {
        setFilteredOrders(result)
      } else {
        console.log("no orders found")
        setFilteredOrders(orders)
      }
    } catch (error) {
      console.log(error)
    }
  }, [searchText])

  useEffect(() => {
    setSearchPlaceHolder("Search orders...")

    let source = axios.CancelToken.source()
    const fetchOrders = async () => {
      setIsLoadingOrders(true)
      try {
        await axios
          .get(`${api_url}/orders`, { cancelToken: source.token })
          .then((res) => {
            setIsLoadingOrders(false)
            setOrders(res.data)
            setFilteredOrders(res.data)
          })
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("fetch aborted")
        } else {
          throw error
        }
      }
    }
    fetchOrders()
    // clean up
    return () => {
      source.cancel()
    }
  }, [orderDeleted])

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchError(!searchError)

    const query = e.target.value.trim()

    if (query) {
      const result = orders.filter((order) => order.order_id === query)
      if (result.length > 0) {
        setOrders(result)
      } else {
        setSearchError(!searchError)
      }
    }
  }

  const handleDelete = async (id) => {
    setOrderDeleted(false)
    try {
      await axios.delete(`${api_url}/orders/${id}`).then((res) => {
        setOrderDeleted(true)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const columns = [
    // { field: "_id", headerName: "ID", width: 70 },
    {
      field: "order_id",
      headerName: "ORDER",
      width: 130,
      renderCell: (params) => {
        return (
          <Link
            to={`/order/${params.row.order_id}`}
            style={{ textDecoration: "none" }}
          >
            <Button>{params.formattedValue}</Button>
          </Link>
        )
      }
    },
    {
      field: "payment_status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            <Button
              startIcon={
                params.formattedValue === "Paid" ? (
                  <DoneIcon style={{ color: green[500] }} />
                ) : params.formattedValue === "Partial" ? (
                  <CachedIcon style={{ color: orange[500] }} />
                ) : params.formattedValue === "Not Paid" ? (
                  <InfoIcon style={{ color: red[500] }} />
                ) : null
              }
              size="small"
            >
              {params.formattedValue}
            </Button>
          </div>
        )
      }
    },
    {
      field: "createdAt",
      headerName: "DATE",
      width: 200,
      type: "date",
      renderCell: (params) => {
        return moment(params.formattedValue).format("MMMM Do YYYY, h:mm")
      }
    },

    {
      field: "total_paid",
      headerName: "Paid",
      width: 200
    },
    {
      field: "total_balance",
      headerName: "Balance",
      width: 200
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 150,
      renderCell: (params) => {
        return (
          <DeleteOutlineIcon
            className={classes.deleteIcon}
            onClick={() => {
              handleDelete(params.row.order_id)
            }}
          />
        )
      }
    }
  ]

  return (
    <>
      {searchError && (
        <Alert
          severity="warning"
          onClose={() => {
            setSearchError(!searchError)
          }}
        >
          {`Order not found - check the ID well!`}
        </Alert>
      )}
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
          Orders
        </Typography>
        <Card elevation={0}>
          <CardContent>
            <Backdrop
              className={classes.backdrop}
              open={isLoadingOrders}
              // onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <div style={{ height: 450, width: "100%" }}>
              <DataGrid
                getRowId={(row) => row._id}
                rows={filteredOrders}
                columns={columns}
                // autoPageSize={true}
                pageSize={6}
                checkboxSelection
                sortModel={[{ field: "createdAt", sort: "desc" }]}
                disableSelectionOnClick
              />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default Orders
