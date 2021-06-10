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
import React, { useEffect, useState } from "react"
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
  }
}))

const Orders = () => {
  const classes = useStyles()

  const [orders, setOrders] = useState([])
  const [orderDeleted, setOrderDeleted] = useState(false)
  const [searchError, setSearchError] = useState(false)
  const [query, setQuery] = useState("")

  useEffect(() => {
    fetchOrders()
  }, [orderDeleted])

  const fetchOrders = async () => {
    await axios.get(`${api_url}/orders`).then((res) => {
      setOrders(res.data)
    })
  }

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
        fetchOrders()
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
      width: 150,
      type: "date",
      renderCell: (params) => {
        return moment(params.formattedValue).format("MMMM Do YYYY, h:mm")
      }
    },

    {
      field: "total_paid",
      headerName: "Paid",
      width: 130
    },
    {
      field: "total_balance",
      headerName: "Balance",
      width: 130
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <DeleteOutlineIcon
            className={classes.deleteIcon}
            onClick={() => handleDelete(params.row.order_id)}
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
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Grid item xs={12} md={3}>
                  <Paper
                    component="form"
                    className={classes.root}
                    disableElevation
                  >
                    <InputBase
                      onChange={(e) => {
                        handleSearch(e)
                      }}
                      type="number"
                      className={classes.input}
                      placeholder="Search orders"
                      inputProps={{ "aria-label": "search orders" }}
                    />
                    <IconButton
                      className={classes.iconButton}
                      aria-label="search"
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Grid>
              </Box>
            </Grid>
            <div style={{ height: 450, width: "100%" }}>
              <DataGrid
                getRowId={(row) => row._id}
                rows={orders}
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
