const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

const port = process.env.PORT || 3001

//db connection
mongoose.connect(process.env.MONGODB_CONNECTION, 
  () => console.log("Connected to db")
);

//middleware
app.use(express.json());
app.use(cors());

//import routes
const authRoutes = require("./routes/auth")

//route middlewares
app.use("/api/users", authRoutes)

app.listen(port, () => console.log(`Server running on ${port}`))