import LibraryBooksIcon from "@material-ui/icons/LibraryBooks"
import { AddCircleOutlined, SubjectOutlined } from "@material-ui/icons"
import LibraryAddIcon from "@material-ui/icons/LibraryAdd"
import { ShoppingBag, Users, UserPlus } from "react-feather"
import CategoryIcon from "@material-ui/icons/Category"

const sub_menu_icon_color = "#0288d1"
const orderMenu = [
  {
    text: "Orders",
    icon: <SubjectOutlined />,
    path: "/orders",
    options: [
      {
        text: "New Order",
        icon: (
          <AddCircleOutlined
            style={{ color: sub_menu_icon_color, fontSize: "small" }}
          />
        ),
        path: "/create"
      },
      {
        text: "All Orders",
        icon: (
          <AddCircleOutlined
            style={{ color: sub_menu_icon_color, fontSize: "small" }}
          />
        ),
        path: "/orders"
      }
    ]
  },
  {
    text: "Products",
    icon: <ShoppingBag />,
    options: [
      {
        text: "Add Product",
        path: "/addproduct",
        icon: (
          <LibraryAddIcon
            style={{ color: sub_menu_icon_color, fontSize: "small" }}
          />
        )
      },
      {
        text: "Product List",
        path: "/products",
        icon: (
          <LibraryBooksIcon
            style={{ color: sub_menu_icon_color, fontSize: "small" }}
          />
        )
      },
      {
        text: "Categories",
        path: "/product/categories",
        icon: (
          <CategoryIcon
            style={{ color: sub_menu_icon_color, fontSize: "small" }}
          />
        )
      }
    ]
  },
  {
    text: "Customers",
    icon: <Users />,
    options: [
      {
        text: "Add Customer",
        icon: <UserPlus style={{ color: sub_menu_icon_color }} size="16" />,
        path: "/add_customer"
      },
      {
        text: "Customers List",
        icon: <Users style={{ color: sub_menu_icon_color }} size="16" />,
        path: "/customers"
      }
    ]
  }
]

export default orderMenu
