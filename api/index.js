const express = require("express"); 
const app = express(); 
const session = require("express-session") 
const passport = require("passport");
require("./middlewares/passport-google"); 
require("./middlewares/passport-github"); 
require("./middlewares/passport-twitter"); 
require("dotenv").config();
const cors = require("cors"); 
const sessionKey = process.env.SESSION_KEY
const authRoute = require("./Routes/Users");
const mongoose = require("mongoose");
const mongoUrl = process.env.MONGO_URL; 
const profileRoute = require("./Routes/profile"); 
const auth = require("./middlewares/passport-jwt")();
const bodyParser = require("body-parser"); 
const localRoute = require("./Routes/local-user"); 
const localUser = require("./Models/Users"); 
const localStrategy = require("passport-local").Strategy; 
const cookieParser = require("cookie-parser"); 
const cookieSession = require("cookie-session");


// app.use(bodyParser.urlencoded({ extended: false }));



mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(console.log("connected to mongoDB")).catch(err => console.log(err));
 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
// for the cookie in passport-jwt 
app.use(cookieParser());


//this is for the passport-oauth strategies to store the data in session for persistence 


// app.use(session({
//   secret:sessionKey,
//   resave: true, 
//   saveUninitialized: true,
//    cookie:{
//     maxAge:1000*60*60*24*7, 
//    }
// }))

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [sessionKey],
  })
);
//this is to initialize the passport-jwt 

app.use(passport.initialize())
app.use(passport.session())



//this is for the passport local mongoose plugin
passport.serializeUser(localUser.serializeUser());
passport.deserializeUser(localUser.deserializeUser());


//this is for the passport local mongoose plugin to carry out the authentication and then verify the password
app.use(auth.initialize());

///make sure you always put the username field: email, when you are using email so you won't get issues
passport.use(new localStrategy({
  usernameField: 'email',
},localUser.authenticate()));


app.use((req,res,next) => {console.log(`index: ${req.isAuthenticated()}`); next()})
app.use('/auth',authRoute);
app.use('/profile', profileRoute); 
app.use('/api/user', localRoute); 



app.listen(5000, ()=> {
    console.log("this port is currently running")
})