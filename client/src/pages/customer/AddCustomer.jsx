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

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block"
  }
}))

const AddCustomer = () => {
  const classes = useStyles()
  const history = useHistory()

  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [alreadyExist, setAlreadyExist] = useState(null)

  // add customer
  const handleAddCustomer = async (e) => {
    e.preventDefault()

    const customer = {
      name,
      phoneNumber,
      address
    }

    try {
      await axios
        .post("/customers", customer)
        .then(() => history.push("/customers"))
    } catch (error) {
      setAlreadyExist(`Customer with phone: ${phoneNumber} already exists`)
    }
  }

  return (
    <Container>
      {alreadyExist && <Alert severity="error">{alreadyExist}</Alert>}
      <Typography variant="h6">Add Customer</Typography>
      <Grid container>
        <Grid item md={6} xs={12}>
          <form onSubmit={handleAddCustomer}>
            <TextField
              label="Name"
              className={classes.field}
              required
              variant="outlined"
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              className={classes.field}
              label="Phone"
              type="tel"
              required
              fullWidth
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField
              className={classes.field}
              label="Address"
              variant="outlined"
              fullWidth
              rows={3}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button
              type="submit"
              startIcon={<Save />}
              variant="contained"
              color="primary"
            >
              Add Customer
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AddCustomer
