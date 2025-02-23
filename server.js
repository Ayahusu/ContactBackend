const express = require("express");
const { errorHandler } = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const userRouter = require("./routes/userRoutes")

connectDb();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(errorHandler);

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", userRouter)

app.listen(port, () => {
  console.log(`Server running on Port ${process.env.PORT}`);
});
