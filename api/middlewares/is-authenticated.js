const loginPage = "http://localhost:3000/login"

isAuth = (req,res,next) =>{
     if(req.user){
         next(); 
     }
     else{
         res.redirect(loginPage); 
     }
}

module.exports = isAuth; 