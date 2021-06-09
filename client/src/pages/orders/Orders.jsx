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
  }
}))

const Orders = () => {
  const classes = useStyles()

  const [orders, setOrders] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  console.log(searchQuery)

  useEffect(() => {
    fetchOrders()
  }, [searchQuery])

  const fetchOrders = async () => {
    await axios
      .get(`${api_url}/orders`, { params: { id: searchQuery } })
      .then((res) => {
        setOrders(res.data)
      })
  }
  // moment().format('MMMM Do YYYY, h:mm:ss a')
  const columns = [
    // { field: "_id", headerName: "ID", width: 70 },
    { field: "order_id", headerName: "ORDER", width: 130 },
    {
      field: "createdAt",
      headerName: "DATE",
      width: 140,
      type: "date",
      renderCell: (params) => {
        return moment(params.formattedValue).format("MMMM Do YYYY, h:mm")
      }
    },
    {
      field: "payment_status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        console.log(params)
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
      field: "total_paid",
      headerName: "Paid",
      flex: 0.5
    },
    {
      field: "total_balance",
      headerName: "Balance",
      flex: 0.5
    }
  ]

  return (
    <>
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
                      onBlur={(e) => {
                        setSearchQuery(e.target.value)
                        console.log("search")
                      }}
                      filled
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
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                getRowId={(row) => row._id}
                rows={orders}
                columns={columns}
                autoPageSize={true}
                checkboxSelection
                sortModel={[{ field: "createdAt", sort: "desc" }]}
              />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default Orders
