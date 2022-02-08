const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const PORT = process.env.PORT || 3001

dotenv.config();

//db connection
mongoose.connect(process.env.MONGODB_CONNECTION, 
  () => console.log("Connected to db")
);

//middleware
app.use(express.json());
app.use(cors());

//import routes
const authRoutes = require("./routes/auth")
const searchRoutes = require("./routes/search")

//routes
app.use("/api/users", authRoutes)

app.use("/api/search", searchRoutes)

app.listen(PORT, () => console.log(`Server running on ${PORT}`))