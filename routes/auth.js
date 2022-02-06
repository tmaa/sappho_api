const express = require("express")

const router = express.Router();

//POST - Create new user
router.post("/register", (req,res,next) => {
  console.log(req.body)

  res.send({message: `User created`})
  next();
});

//GET - Get specific user
router.get("/login", (req, res, next) => {
  res.send({message: `User logged in`})
});

//PUT - Update specific user
router.put("/api/users/:id", (req, res, next) => {

});

//DELETE - Delete specific user
router.delete("/api/users/:id", (req, res, next) => {

});

module.exports = router
