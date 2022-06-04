const router = require("express").Router(); 
const passport = require("passport"); 
const loginPage = "http://localhost:3000/login"
const homePage = "http://localhost:3000/"
const userController = require("../Controllers/user-controller")
const isAuth = require("../middlewares/is-authenticated")


//auth login
router.get("/login/success",isAuth,userController.getuserdata)

//auth failure 
router.get("/login/failed", userController.getfailuremsg)

//auth logout
router.get("/logout", (req,res) => {
    console.log(`the value before the logout: ${req.user} `)
    // req.session = null;
    req.logout();
    console.log(`the logout worked: ${req.user}`) 
    res.redirect(loginPage);
},)
//auth sign in with google
router.get("/google", passport.authenticate("google",{
    scope: [ 'email', 'profile' ],
}))

//callback url for google to redirect to 
router.get("/google/callback",passport.authenticate("google",
{
    successMessage: "you just logged in with your google oauth", 
    failureRedirect:"/login/failed",
    successRedirect:homePage

}) )






 
//auth sign in with gitHub
router.get("/github", (req, res, next) => {
    if (req.user) {
      console.log("user");
      res.redirect("/auth/login/success");
    } else next();
  }, passport.authenticate("github",{
    scope: ["user:email"]
})); 
//call back url for github it is where it will redirect you to the page you want to get to
router.get("/github/callback", passport.authenticate("github",{
    failureRedirect:"auth/login/failed",
}), (req,res) => {res.redirect("/auth/login/success");})


//auth sign in for twitter

router.get("/twitter", passport.authenticate('twitter'));
router.get("/twitter/callback",passport.authenticate("twitter",{
    failureRedirect:"auth/login/failed",
    successRedirect:homePage
}) )

module.exports = router

