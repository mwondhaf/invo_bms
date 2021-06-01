import React, { useState } from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import Button from "@material-ui/core/Button"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { Collapse, Typography } from "@material-ui/core"
import orderMenu from "../menuData/orders"
import { useHistory, useLocation } from "react-router"

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  title: {
    padding: theme.spacing(2)
  }
}))

export default function NavDrawer({ isDrawerOpen, toggleDrawer }) {
  const classes = useStyles()

  const [expanded, setExpanded] = useState("")
  const history = useHistory()
  const location = useLocation()

  const handleExpanded = (index) => {
    if (expanded === index) {
      setExpanded("")
    } else {
      setExpanded(index)
    }
  }

  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          anchor="left"
          open={isDrawerOpen}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
        >
          <div className={classes.list}>
            <div className={classes.title}>
              <Typography variant="h5">Business Name</Typography>
            </div>
            <Divider />
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

                  <Collapse
                    in={index === expanded}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List>
                      {options.map(({ path, icon, text, index }) => (
                        <ListItem
                          key={index}
                          button
                          onClick={() => {
                            toggleDrawer()
                            history.push(path)
                          }}
                          className={[
                            location.pathname === path
                              ? classes.active_sub
                              : null,
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
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  )
}
