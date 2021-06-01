import {
  AppBar,
  Collapse,
  Container,
  Drawer,
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
    paddingTop: theme.spacing(2)
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

      <AppBarNav />

      {/* <NavDrawer isMenuOpen={isMenuOpen} /> */}

      {/* <AppBar position="fixed" className={classes.appbar} elevation={0}>
        <Toolbar>
          <Typography className={classes.date}>
            Today is {format(new Date(), "do MMM Y")}
          </Typography>
          <Typography>Frank</Typography>
        </Toolbar>
      </AppBar> */}

      {/* <NavDrawer /> */}
      {/* nav bar */}
      {/* <Drawer
        className={classes.drawer}
        anchor="left"
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.title}>
          <Typography variant="h5">Frank Orders</Typography>
        </div>

        <List>
          {orderMenu.map(({ text, icon, path, options }, index) => (
            <div key={index}>
              <ListItem
                button
                onClick={() => {
                  handleExpanded(index)
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>

              <Collapse in={index === expanded} timeout="auto" unmountOnExit>
                <List>
                  {options.map(({ path, icon, text, index }) => (
                    <ListItem
                      key={index}
                      button
                      onClick={() => {
                        history.push(path)
                      }}
                      className={[
                        location.pathname === path ? classes.active_sub : null,
                        classes.sub_menu
                      ]}
                    >
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </Drawer> */}

      <div className={classes.page}>
        {/* <div className={classes.toolbar}></div> */}
        <Container>{children}</Container>
      </div>
    </div>
  )
}

export default Layout
