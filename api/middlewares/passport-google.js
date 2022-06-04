const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
require('dotenv').config()
const googleId = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET
const User = require('../Models/Users')

passport.serializeUser((user, done) => {
  done(null, user.id)
  // console.log(user);
})
passport.deserializeUser((id, done) => {
  // console.log("chigala")
  User.findById(id).then(user => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: googleId,
      clientSecret: clientSecret,
      callbackURL: 'http://localhost:5000/auth/google/callback',
      passcallbackURL: true
    },
    (req, accessToken, refreshToken, profile, done) => {
      console.log(profile)
      User.findOne({
        email: profile.emails[0].value
      }).then(currentUser => {
        if (currentUser.googleid) {
          done(null, currentUser)
          return
        }
        if (!currentUser.googleid) {
          User
            .updateOne({email:profile.emails[0].value},{
              $set: {
                googleid: profile.id,
                photourl: profile.photos[0].value,
                name: profile.displayName
              }
            })
            .then(user =>{console.log(`this is the updatedUser: ${user}`); done(null, user)})
        } else {
          new User({
            name: profile.displayName,
            googleid: profile.id,
            email: profile.emails[0].value,
            photourl: profile.photos[0].value
          })
            .save()
            .then(user => {
              done(null, user)
            })
        }
      })
    }
  )
)
