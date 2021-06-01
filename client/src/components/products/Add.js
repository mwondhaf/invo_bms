import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@material-ui/core"
import React from "react"
import AddBoxIcon from "@material-ui/icons/AddBox"

const Add = (props) => {
  console.log(props.category)

  return (
    <div>
      <Grid container>
        <Grid item sm={12} md={12} lg={8}>
          <form onSubmit={props.handleSubmit}>
            <Grid container>
              <Grid item md={5} xs={12} className={props.classes.grid}>
                <TextField
                  className={props.classes.field}
                  variant="outlined"
                  size="small"
                  label="Product Name"
                  required
                  fullWidth
                  onChange={(e) => props.setProductName(e.target.value)}
                />

                {props.categories && (
                  <FormControl
                    variant="outlined"
                    fullWidth
                    size="small"
                    className={props.classes.field}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={props.category}
                      label="Category"
                      required
                      onChange={(e) => {
                        props.setCategory(e.target.value)
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {props.categories.map((item) => (
                        <MenuItem key={item.id} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                <TextField
                  className={props.classes.field}
                  variant="outlined"
                  size="small"
                  label="Quantity"
                  type="number"
                  required
                  fullWidth
                  onChange={(e) => props.setQuantity(e.target.value)}
                />
              </Grid>
              <Grid item md={5} xs={12}>
                <TextField
                  className={props.classes.field}
                  variant="outlined"
                  fullWidth
                  size="small"
                  label="Sale Price"
                  required
                  type="number"
                  onChange={(e) => props.setPrice(e.target.value)}
                />
                <TextField
                  className={props.classes.field}
                  variant="outlined"
                  size="small"
                  label="Product Cost"
                  required
                  fullWidth
                  type="number"
                  onChange={(e) => props.setCost(e.target.value)}
                />
                <TextField
                  fullWidth
                  className={props.classes.field}
                  variant="outlined"
                  size="small"
                  label="Brand"
                  onChange={(e) => props.setBrand(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              startIcon={<AddBoxIcon />}
              variant="contained"
              color="primary"
              type="submit"
              size="large"
            >
              Create Product
            </Button>
          </form>
        </Grid>
        <Grid item sm={12} md={12} lg={4}>
          <Typography variant="h6"></Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default Add
