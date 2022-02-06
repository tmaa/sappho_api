const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

//db connection
mongoose.connect(
  process.env.MONGODB_CONNECTION, 
  () => console.log("Connected to db")
);

const app = express();
app.use(express.json());

app.use(cors());

const port = process.env.PORT || 3001

//import routes
const authRoutes = require("./routes/auth")

//route middlewares
app.use("/api/users", authRoutes)

app.listen(port, () => console.log(`Server running on ${port}`))