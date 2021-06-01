import {
  Typography,
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  makeStyles
} from "@material-ui/core"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import React, { useEffect, useState } from "react"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: 10
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

const Orders = () => {
  const [orders, setOrders] = useState([])

  const classes = useStyles()

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => res.json())
      .then((data) => setOrders(data))
  }, [])

  return (
    <Container>
      <Grid container>
        <Grid container>
          <Grid item className={classes.root}>
            <AppBar position="static" color="transparent">
              <Toolbar>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  aria-label="menu"
                ></IconButton>
                <Typography variant="h6" className={classes.title}>
                  <Button
                    startIcon={<AddCircleOutlineIcon />}
                    color="secondary"
                    variant="contained"
                  >
                    New Order
                  </Button>
                </Typography>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
          </Grid>
        </Grid>
        {orders.map((order) => (
          <Grid item key={order.id} xs={12} md={6} lg={4}>
            <Paper>{order.title}</Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Orders
