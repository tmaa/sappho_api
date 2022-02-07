const express = require('express')
const User = require('../models/User');
const {registerValidation} = require('../validation')

const router = express.Router();


//POST - Create new user
router.post("/register", async (req, res, next) => {
  //validate before db entry
  const {error} = registerValidation(req.body)
  if(error){
    console.log(error.details[0].message)
    return res.status(400).send({message: error.details[0].message})
  }

  const checkEmail = await User.findOne({email: req.body.email});
  const checkPhone = await User.findOne({phone: req.body.phone});
  if(checkEmail){
    console.log("Email already exists")
    return res.status(400).send({message: "Email already exists"})
  }
  if(checkPhone){
    console.log("Phone number already exists")
    return res.status(400).send({message: "Phone number already exists"})
  }

  const user = new User({
    _id: req.body.id,
    name: req.body.name,
    age: req.body.age,
    height: req.body.height,
    email: req.body.email,
    phone: req.body.phone
  });

  try{
    const savedUser = await user.save()
    console.log(savedUser)
    res.send({message: "User created", user: savedUser});
  }catch(err){
    console.log(err)
    res.status(400).send({status: 400, error: err})
  }

  next();
});

//GET - Get logged in user information
router.get("/me/:id", async (req, res, next) => {
  try{
    const userInfo = await User.findById(req.params.id)
    console.log(userInfo)
    res.status(200).send({user: userInfo})
  }catch(err){
    console.log(err)
    res.status(400).send({message: err})
  }
});

//PUT - Update specific user
router.put("/api/users/:id", (req, res, next) => {

});

//DELETE - Delete specific user
router.delete("/delete/:id", (req, res, next) => {
  console.log("user deleted: " + req.params.id)
  res.send({message: `User deleted`})
  next();
});

module.exports = router
