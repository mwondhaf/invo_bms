import { Box, Button, makeStyles, TextField } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import TableTemplate from "../../components/TableTemplate"
import axios from "axios"
import api_url from "../../api/api"

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: 20,
    marginBottom: 20,
    marginRight: theme.spacing(2)
  }
}))

const Categories = () => {
  const classes = useStyles()

  const [catData, setCatData] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [name, setName] = useState()
  const [watchDelete, setWatchDelete] = useState(false)

  const columns = [
    {
      title: "Category ID",
      field: "id",
      defaultSort: "desc",
      hidden: true
    },
    {
      title: "Category",
      field: "name"
    },
    {
      title: "Quantity in Stock",
      field: "quantity"
    }
  ]

  const actions = [
    {
      icon: "delete",
      tooltip: "Delete",
      onClick: (event, rowData) => handleDelete(rowData._id)
    }
  ]

  const handleDelete = (_id) => {
    try {
      axios.delete(`${api_url}/categories/${_id}`).then(() => {
        setWatchDelete(!watchDelete)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpen = () => {
    setOpenModal(!openModal)
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await axios.get(`${api_url}/categories`).then((res) => {
          setCatData(res.data)
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategories()
  }, [watchDelete])

  const addCategory = async (e) => {
    e.preventDefault()

    try {
      await axios.post(`${api_url}/categories`, { name }).then(() => {
        setWatchDelete(!watchDelete)
        setOpenModal(!openModal)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined" color="primary">
        Add Category
      </Button>

      {openModal && (
        <Box>
          <form onSubmit={addCategory}>
            <TextField
              className={classes.field}
              variant="outlined"
              size="small"
              label="Add Category"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Button
              className={classes.field}
              variant="contained"
              color="primary"
              type="submit"
            >
              Add
            </Button>
          </form>
        </Box>
      )}

      <TableTemplate
        title="All Categories"
        columns={columns}
        data={catData}
        actions={actions}
      />
    </div>
  )
}

export default Categories
