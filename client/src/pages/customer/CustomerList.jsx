import { CircularProgress, Container, makeStyles } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import TableTemplate from "../../components/TableTemplate"
import axios from "axios"
import Alert from "@material-ui/lab/Alert"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2)
    }
  }
}))

const CustomerList = () => {
  const classes = useStyles()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [watchDelete, setWatchDelete] = useState(false)
  const [deleteAlert, setDeleteAlert] = useState(false)

  useEffect(() => {
    const fetchCustomers = async () => {
      axios.get("/customers").then((res) => {
        setData(res.data)
        setLoading(false)
      })
    }
    fetchCustomers()
  }, [watchDelete])

  const handleDelete = (_id) => {
    axios.delete(`/customers/${_id}`).then(() => {
      setWatchDelete(!watchDelete)
      setDeleteAlert("Deleted Successfully")
    })
  }

  const columns = [
    { title: "ID", field: "id", defaultSort: "desc", hidden: true },
    {
      title: "Name",
      field: "name"
    },
    {
      title: "Phone Number",
      field: "phoneNumber"
    },
    {
      title: "Location",
      field: "address"
    }
  ]

  const actions = [
    {
      icon: "delete",
      tooltip: "Delete",
      onClick: (event, rowData) => handleDelete(rowData._id)
    }
  ]

  return (
    <Container>
      {deleteAlert && <Alert severity="error">{deleteAlert}</Alert>}
      {loading ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <TableTemplate
          actions={actions}
          data={data}
          columns={columns}
          title="All Customers"
        />
      )}
    </Container>
  )
}

export default CustomerList
