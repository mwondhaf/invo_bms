import {
  Box,
  Grid,
  ListItem,
  ListItemText,
  makeStyles
} from "@material-ui/core"
import React from "react"
import { subMenu } from "../menuData/menu"
import AppBarNav from "./AppBarNav"

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  page: {
    background: "#F7FCFC",
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
  },
  wrapper: {
    backgroundColor: "#fff"
  },
  navbarDisplayFlex: {
    display: "flex",
    justifyContent: `space-between`
  }
}))

const Layout = ({ children }) => {
  const classes = useStyles()

  return (
    <div>
      <Box bgcolor="primary.main" color="white" pb={15}>
        <AppBarNav />
        <Grid container justify="center">
          <Grid item md={10}>
            <Box
              flexWrap="wrap"
              display="flex"
              borderTop={3}
              borderColor="primary.light"
            >
              {subMenu.map(({ text, index }) => (
                <Box key={index} display={{ xs: "none", sm: "block" }}>
                  <ListItem button>
                    <ListItemText primary={text} />
                  </ListItem>
                </Box>
              ))}
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
