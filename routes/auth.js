const express = require('express')
const passport = require('passport')
const router = express.Router()


//@desc    Auth with Google
//route    GET / auth/google
//get on docs of Passport
router.get('/google', passport.authenticate('google', {scope: ['profile'] }))

//@desc    Google auth callback
//route    GET /auth/google/callback                            //if failed go back to main page
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), (req,res) => {
    res.redirect('/dashboard')  //if succeeds go to /dashboard page
})


//@desc    Logout user
//@route   /auth/logout
router.get('/logout', (req,res, next) => {
    req.logout(function(err) {
        if(err) {return next(err)}
        res.redirect('/')
    })
})

module.exports = router //able to export to any file 