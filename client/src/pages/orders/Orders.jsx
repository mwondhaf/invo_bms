import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
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
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import DirectionsIcon from "@material-ui/icons/Directions"

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
  console.log(orders)

  useEffect(() => {
    const fetchOrders = async () => {
      await axios.get(`${api_url}/orders`).then((res) => {
        setOrders(res.data)
      })
    }
    fetchOrders()
  }, [])

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
      flex: 1
    },
    {
      field: "total_paid",
      headerName: "Total",
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
                  <Paper component="form" className={classes.root}>
                    <InputBase
                      className={classes.input}
                      placeholder="Search orders"
                      inputProps={{ "aria-label": "search orders" }}
                    />
                    <IconButton
                      type="submit"
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
