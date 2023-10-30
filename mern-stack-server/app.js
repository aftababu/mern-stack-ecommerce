const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path=require('path')


const app = express();
// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require('dotenv').config({path:"mern-stack-server/config/config.env"})

}


const corsOptions = {
  origin: "https://ecommerce-kknr.onrender.com",
  credentials: true,
  
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");
const payment = require("./routes/paymentsRoutes");
const errorMiddleware = require("./middleware/error");

app.use("/api/v1/", product);
app.use("/api/v1/", user);
app.use("/api/v1/", order);
app.use("/api/v1/", payment);
app.use(express.static(path.join(__dirname, "../mern-stack-client/dist")));


app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../mern-stack-client/dist/index.html"));
});

// Middleware for error
app.use(errorMiddleware);

module.exports = app;
