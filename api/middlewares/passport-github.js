const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
require('dotenv').config()
const githubId = process.env.GIT_HUB_CLIENT_ID
const gitHubClientSecret = process.env.GITHUB_CLIENT_SECRET
const User = require('../Models/Users')
// require('https').globalAgent.options.rejectUnauthorized = false;

passport.serializeUser((user, done) => {
  done(null, user._id)
})
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user))
})

const params = {
  clientID: githubId,
  clientSecret: gitHubClientSecret,
  callbackURL: '/auth/github/callback'
}

const strategy = new GitHubStrategy(
  params,
  (accessToken, refreshToken, profile, done) => {
    User.findOne({
      githubid: profile.id
    }).then(currentUser => {
      if (currentUser) {
        done(null, currentUser)
      } else {
        new User({
          name: profile.displayName,
          githubId: profile.id
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
