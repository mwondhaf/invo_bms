import { createMuiTheme, ThemeProvider } from "@material-ui/core"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom"
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
import CheckOut from "./pages/orders/CheckOut"
import { CartProvider } from "./context/CartContext"
import ProductsGrid from "./pages/products/ProductsGrid"
import OrderDetails from "./pages/orders/OrderDetails"
import Invoice from "./pages/orders/Invoice"
import { HeaderProvider } from "./context/HeaderContext"

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#515b5f",
      main: "#263238",
      dark: "#1a2327",
      contrastText: "#fff"
    }
  },
  typography: {
    fontFamily: "Inter",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 900
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <HeaderProvider>
          <Router>
            <Layout>
              <Switch>
                <Route exact path="/order/:id">
                  <OrderDetails />
                </Route>
                <Route exact path="/invoice/:id">
                  <Invoice />
                </Route>
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

                <Route exact path="/grid">
                  <ProductsGrid />
                </Route>

                <Route path="*">
                  <h2>Not found</h2>
                </Route>
              </Switch>
            </Layout>
          </Router>
        </HeaderProvider>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
