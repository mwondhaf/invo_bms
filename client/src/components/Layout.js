import {
  Box,
  Grid,
  ListItem,
  ListItemText,
  makeStyles
} from "@material-ui/core"
import React, { useContext, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { HeaderContext } from "../context/HeaderContext"
import { subMenu } from "../menuData/menu"
import AppBarNav from "./AppBarNav"

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  page: {
    background: "#e0f2f1",
    width: "100%",
    paddingTop: theme.spacing(2),
    minHeight: "80vh"
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
  },
  navbarDisplayFlex: {
    display: "flex",
    justifyContent: `space-between`
  },
  listItemText: {
    fontSize: "0.7em" //Insert your required size
  }
}))

const Layout = ({ children }) => {
  const classes = useStyles()
  const [showHeader, setShowHeader] = useContext(HeaderContext)

  const location = useLocation()
  const order_detail_location = location.pathname.split("/")[1]

  useEffect(() => {
    {
      order_detail_location === "order"
        ? setShowHeader(false)
        : setShowHeader(true)
    }
  }, [location])

  return (
    <div>
      <Box bgcolor="primary.main" color="white">
        <AppBarNav />
        <Grid container justify="center">
          <Grid item md={10}>
            <Box
              flexWrap="wrap"
              display="flex"
              borderTop={3}
              borderColor="primary.light"
            >
              {showHeader && (
                <>
                  {subMenu.map(({ text, index }) => (
                    <Box key={index} display={{ xs: "none", sm: "block" }}>
                      <ListItem button>
                        <ListItemText
                          primary={text}
                          classes={{ primary: classes.listItemText }}
                        />
                      </ListItem>
                    </Box>
                  ))}
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      <div className={classes.page}>
        <Grid container justify="center">
          <Grid item xs={11}>
            {children}
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Layout
