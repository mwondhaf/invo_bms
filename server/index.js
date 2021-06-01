import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

// import authRoutes from "./routes/auth.js"
// import updateUserRoute from "./routes/users.js"
import productRoutes from "./routes/products.js"
import customerRoutes from "./routes/customers.js"
import categoryRoutes from "./routes/categories.js"
import orderRoutes from "./routes/orders.js"

const app = express()

dotenv.config()

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(console.log("connected to db"))
  .catch((error) => console.log(error))

const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
}

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})

app.use(express.json({ limit: "30mb" }))

app.use(express.urlencoded({ limit: "30mb", extended: true }))

app.use(cors())

// links
app.use("/api/customers", customerRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)

app.get("/", (req, res) => {
  res.send("Hello from Express!")
})
