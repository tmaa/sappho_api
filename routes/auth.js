const express = require('express')
const User = require('../models/User');

const router = express.Router();

//validation
const Joi = require('@hapi/joi');

const schema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().max(50).required(),
  age: Joi.number().required(),
  height: Joi.number().required(),
  email: Joi.string().required().email(),
});

//POST - Create new user
router.post("/register", async (req,res,next) => {
  //validate before db entry
  const validation = schema.validate(req.body)

  console.log(validation)
  const user = new User({
    _id: req.body.id,
    name: req.body.name,
    age: req.body.age,
    height: req.body.height,
    email: req.body.email
  });

  try{
    const savedUser = await user.save()
    res.send(savedUser);
  }catch(err){
    console.log(err)
    res.status(400).send(err)
  }

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
router.delete("/delete/:id", (req, res, next) => {
  console.log("user deleted: " + req.params.id)
  res.send({message: `User deleted`})
  next();
});

module.exports = router
