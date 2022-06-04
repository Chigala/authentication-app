const loginPage = "http://localhost:3000/login"
const homePage = "http://localhost:3000/"

module.exports = {
    
    getuserdata : (req, res, next) => {
        res.redirect(homePage); 
    },
    getfailuremsg: (req, res)=> {
        res.status(500).json({
            success: false, 
            message:"failure"
        })
    },
    logout: (req,res) => {
        req.session = null;
        req.logout(); 
        res.redirect(loginPage);
    },
    


}