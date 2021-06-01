import { createMuiTheme, ThemeProvider } from "@material-ui/core"
import { blue } from "@material-ui/core/colors"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Create from "./pages/orders/Create"
import AddCustomer from "./pages/customer/AddCustomer"
import CustomerList from "./pages/customer/CustomerList"
import Home from "./pages/Home"
import Orders from "./pages/orders/Orders"
import AddProduct from "./pages/products/AddProduct"
import AllProducts from "./pages/products/AllProducts"
import Categories from "./pages/products/Categories"
import EditProduct from "./pages/products/EditProduct"
import ProductDetail from "./pages/products/ProductDetail"

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
  typography: {
    fontFamily: "Inter",
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/create">
              <Create />
            </Route>
            <Route exact path="/orders">
              <Orders />
            </Route>
            <Route exact path="/products">
              <AllProducts />
            </Route>

            <Route exact path="/addproduct">
              <AddProduct />
            </Route>
            <Route exact path="/productdetails">
              <ProductDetail />
            </Route>
            <Route exact path="/product/edit/:id">
              <EditProduct />
            </Route>
            <Route exact path="/product/categories">
              <Categories />
            </Route>
            <Route exact path="/add_customer">
              <AddCustomer />
            </Route>
            <Route exact path="/customers">
              <CustomerList />
            </Route>
            <Route path="*">
              <h2>Not found</h2>
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
