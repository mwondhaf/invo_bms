import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core"
import React, { useState } from "react"
import { Save } from "react-feather"
import { useHistory } from "react-router"
import Alert from "@material-ui/lab/Alert"
import axios from "axios"
import api_url from "../../api/api"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/material.css"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import { UserPlus } from "react-feather"

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block"
  },
  select_card: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    boxShadow: "none"
  }
}))

const AddCustomer = () => {
  const classes = useStyles()
  const history = useHistory()

  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("+256")
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")
  const [otherDetails, setOtherDetails] = useState("")
  const [alreadyExist, setAlreadyExist] = useState(null)

  // add customer
  const handleAddCustomer = async (e) => {
    const customer = {
      name,
      phoneNumber: phoneNumber.replace(/\s/g, ""),
      address,
      email,
      otherDetails
    }

    try {
      await axios.post(`${api_url}/customers`, customer).then((res) => {
        history.push("/customers")
      })
    } catch (error) {
      setAlreadyExist(`Customer with phone: ${phoneNumber} already exists`)
    }
  }

  return (
    <Grid item xs={12}>
      {alreadyExist && <Alert severity="error">{alreadyExist}</Alert>}
      <Typography
        variant="h5"
        style={{
          fontWeight: "900",
          color: "#2E3C42",
          paddingBottom: "10px"
          // paddingLeft: 10
        }}
      >
        Add Customer
      </Typography>

      <Card elevation={0}>
        <Grid container>
          <Grid item xs={12} pb={1}>
            <Card classes={{ root: classes.select_card }}>
              <CardContent>
                <Grid container>
                  <Grid item xs={12} sm={6} md={4} style={{ padding: "5px" }}>
                    <TextField
                      label="Name"
                      className={classes.field}
                      required
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setName(e.target.value)}
                    />

                    <PhoneInput
                      inputStyle={{
                        minWidth: "100%"
                      }}
                      inputProps={{
                        prefix: "+"
                      }}
                      masks={{ ug: "... ... ..." }}
                      defaultCountry="UG"
                      value={phoneNumber}
                      onBlur={(e) => setPhoneNumber(e.target.value)}
                    />
                    <TextField
                      className={classes.field}
                      label="Address"
                      variant="outlined"
                      fullWidth
                      rows={3}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} style={{ padding: "5px" }}>
                    <TextField
                      label="Email"
                      className={classes.field}
                      type="email"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      className={classes.field}
                      label="Other details"
                      variant="outlined"
                      fullWidth
                      rows={3}
                      onChange={(e) => setOtherDetails(e.target.value)}
                    />
                    <Button
                      style={{
                        paddingBottom: "15px",
                        marginBottom: 20,
                        display: "inline"
                      }}
                      startIcon={<UserPlus />}
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      onClick={() => handleAddCustomer()}
                    >
                      Add Customer
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}

export default AddCustomer
