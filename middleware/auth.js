//middleware sits in middle between responses moving back and forth. 
//here we will require login to access dashboard and other functions. 
module.exports = {
    ensureAuth: function (req,res, next) {  //next is function you call when youre dont and want to go to next part
        if(req.isAuthenticated()) {  //if user is authenticated, then return next() and move on to next thing
            return next()  
        }else { //if not authenticated go to home page (to login)
            res.redirect('/')
        }
    },
    ensureGuest: function (req,res, next) {  //if you are already logged in 
        if(req.isAuthenticated()) {
            res.redirect('/dashboard')  //you will be redirected to dashboard instead of login page again 
        }else {  
            return next()
        }
    }
}