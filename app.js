const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { connectToDatabase } = require("./utils/connectToDatabase");

// Import Routes:-
const authRoutes = require("./Routes/Authentication");
const userRoutes = require("./Routes/User");
const categoryRoutes = require("./Routes/Category");
const productRoutes = require("./Routes/Product");
const orderRoutes = require("./Routes/Order");

dotenv.config();
const app = express();
const port = 8000;

// Db Connection:-
connectToDatabase();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes:-
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

// Staring Server:-
app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
