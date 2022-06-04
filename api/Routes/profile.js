const router = require('express').Router()
const auth = require('../middlewares/passport-jwt')()
const controller = require('../Controllers/post-controller')
const User = require('../Models/Users')
const uploadToCloudinary = require("../Services/upload-to-cloudinary")

router.get('/', (req, res) => {
  res.status(200).json(req.user)
})
// to update the user in the profile page
router.put('/update/:id', async (req, res) => {
 try{
  await User.findByIdAndUpdate(
    req.params.id ,
   {$set: {
    bio: req.body.bio,
    name: req.body.name,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    photourl: req.body.file
      
    }}
  )
  res.status(200).json("it has been updated"); 
 } catch (err){
   res.status(500).json(err)
 }
})

router.get('/profile', (req, res, next) => {
  res.json({
    message: 'you made it to the secure route',
    user: req.user,
    token: req.query.jwttoken
  })
})

router.get('/mypost', auth.authenticate(), controller.get_post)

module.exports = router

// bio: req.body.bio,
//       name: req.body.name,
//       email: req.body.email,
//       phonenumber: req.body.phonenumber,
//       file: req.body.file