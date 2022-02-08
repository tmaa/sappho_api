const express = require('express')
const router = express.Router();
const {verifyAccess} = require("../middleware/auth");
const { findById } = require('../models/User');
const User = require('../models/User');

//
//Search for and filter users matching current logged in user preferences
router.get("/filter/:id", verifyAccess, async (req, res, next) => {
  try{
    const user = await User.findById(req.params.id)
    if(user){
      console.log(user)
      const minAge = user.preferences.minAge
      const maxAge = user.preferences.maxAge
      const longitude = user.location.coordinates[0]
      const latitude = user.location.coordinates[1]
      const maxDistance = user.preferences.maxDistance

      const query = await User.find({
        _id: {
          $ne: req.params.id
        },
        age: {
          $gte: minAge,
          $lte: maxAge
        },
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude]
            },
            $maxDistance: maxDistance
          }
        }
      }).limit(25).select('_id')
      res.send({data: query})
    }else{
      res.status(400).send({message: "Error"})
    }
  }catch(err){
    console.log(err)
    res.status(400).send({message: "Error"})
  }
});

module.exports = router
