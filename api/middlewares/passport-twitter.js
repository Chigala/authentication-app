const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy
require('dotenv').config()
const User = require('../Models/Users')

passport.serializeUser((user, done) => {
  done(null, user._id)
})
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user))
})

const params = {
  consumerKey: process.env.TWITTER_API_KEY,
  consumerSecret: process.env.TWITTER_API_KEY_SECRET,
  callbackURL: '/auth/twitter/callback',
  includeEmail: true
}

const strategy = new TwitterStrategy(
  params,
  (token, tokenSecret, profile, done) => {
    // console.log(profile.emails[0].value)
    User.findOne({
      email: profile.emails[0].value
    }).then(currentUser => {
      if (currentUser.twitterid) {
        done(null, currentUser)
        return
      }
      if (!currentUser.twitterid) {
        User.updateOne(
          { email: profile.emails[0].value },
          {
            $set: {
              twitterid: profile.id,
              photourl: profile.photos[0].value,
              name: profile.displayName
            }
          }
        ).then(user => {
          console.log(`this is the updatedUser: ${user}`)
          done(null, user)
        })
      } else {
        new User({
          name: profile.displayName,
          twitterid: profile.id,
          email: profile.emails[0].value,
          photourl: profile.photos[0].value
        })
          .save()
          .then(user => {
            console.log(`newly created user: ${user}`)
            done(null, user)
          })
      }
    })
  }
)
passport.use(strategy)
