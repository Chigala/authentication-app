const express = require('express')
const User = require('../Models/Users')
const jwt = require('jwt-simple')
require('dotenv').config()
const jwtSecret = process.env.JWT_SECRET

// login in and then create a jwt token
//note the payload contains the user id data that you can use to store the user in a cookie if you later want to use it.

exports.login = function (req, res) {
  //this method basically finds the username that is supplied in the login text field
  User.findOne({ email: req.body.email }, (err, user) => {
    if(user.googleid){
      res.redirect("/auth/google"); 
    }
    if (err) {
      console.log('Error Happened In passport-jwt login route')
      return
    }
    var payload = {
      id: user.id,
      expire: Date.now() + 1000 * 60 * 60 * 24 * 7 //7 days
    }
    var token = jwt.encode(payload, jwtSecret)
    res.cookie('cookietoken', token, { httpOnly: true })
    res.json({
      token: token,
      msg: 'you have logged in to your account'
    })
  })
}

//this is used to register a new user the User.register is a passport-local-mongoose method

exports.register = async (req, res) => {
  //to check if the user we are registering has his/her email already in our database
  const user = await User.findOne({ email: req.body.email })
  //if he/she is in our data base already you redirect him to the google auth page so he gets authenticated
  if (user) {
    res.redirect('/auth/google')
  } else {
    User.register(
      new User({ email: req.body.email }),
      req.body.password,
      function (err, msg) {
        if (err) {
          res.send(err)
        } else {
          res.send({ message: 'Successful' })
        }
      }
    )
  }
}
