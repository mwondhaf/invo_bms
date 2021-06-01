import {
  AppBar,
  Box,
  Collapse,
  Container,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
  Toolbar,
  Typography
} from "@material-ui/core"
import React, { useState } from "react"
import { useHistory, useLocation } from "react-router"
import { format } from "date-fns"
import orderMenu from "../menuData/orders"
import AppBarNav from "./AppBarNav"
import NavDrawer from "./NavDrawer"

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  page: {
    background: "#f9f9f9",
    width: "100%",
    paddingTop: theme.spacing(2),
    height: "100%"
  },
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth
  },
  root: {
    display: "flex"
  },
  active: {
    background: "#f4f4f4"
  },
  active_sub: {
    background: "#bbdefb",
    color: "#01579b"
  },
  sub_menu: {
    paddingLeft: theme.spacing(4),
    padding: 0
  },
  title: {
    padding: theme.spacing(2)
  },
  appbar: {
    width: `calc(100% - ${drawerWidth}px)`
  },
  toolbar: theme.mixins.toolbar,
  date: {
    flexGrow: 1
  },
  wrapper: {
    backgroundColor: "#fff"
  }
}))

const Layout = ({ children }) => {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const [expanded, setExpanded] = useState("")

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  //   functions
  const handleExpanded = (index) => {
    if (expanded === index) {
      setExpanded("")
    } else {
      setExpanded(index)
    }
  }

  return (
    // <div className={classes.root}>
    <div>
      {/* AppBar */}

      <Box bgcolor="primary.main" color="white" pb={25}>
        <AppBarNav />
      </Box>

      <div className={classes.page}>
        <Grid container justify="center">
          <Grid item xs={11}>
            <Box mt={-25} className={classes.wrapper} borderRadius={5}>
              <Box pt={3} height="100%">
                {children}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Layout
