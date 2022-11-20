const express = require("express");
const app = express();
var cors = require("cors");

require("dotenv").config()
const userRouter = require("./routes/user.route");
const connection = require("./db");
const ProductRoute = require("./routes/products.route");
const cartRoute = require("./routes/Cart.route");


app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/product",ProductRoute);
app.use("/cart", cartRoute);

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});


app.listen(process.env.PORT, async () => {
  await connection;
  console.log("server running");
});
