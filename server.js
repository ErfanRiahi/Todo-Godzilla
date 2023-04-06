require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const routes = require("./routes/api/todos");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", routes);
app.use("/members", routes);

const PORT = process.env.PORT || 5000;

// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI);
//     app.listen(PORT, () => console.log(`server is running on port ${PORT} 😃`));
//   } catch (err) {
//     console.log("*******ERROR IN server*******", err);
//   }
// };

// start();
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, console.log(`server is running on port ${PORT} 😃`))
  )
  .catch((err) => console.log(err));
