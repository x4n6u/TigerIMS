require("dotenv").config();

const express = require("express");
const loginRoutes = require("./routes/loginRoutes");
const itemRoutes = require("./routes/itemRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const historyRoutes = require("./routes/historyRoutes");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const cors = require("cors");

// Import the LoginStrategy configuration function
const LoginStrategy = require("./config/LoginStrategy");

//express app
const app = express();
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
//middleware
app.use(express.json());
app.use(flash());

app.use(cors());

// Call the LoginStrategy function to configure passport
const passportConfig = LoginStrategy(passport);
//console.log(passportConfig);
app.use(passportConfig.initialize());
app.use(passportConfig.session());

//routes
app.use("/api/item", itemRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/user", userRoutes);
//console.log(loginRoutes)
app.use("/api/login", loginRoutes);
app.use("/api/history", historyRoutes);

//connect db
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
