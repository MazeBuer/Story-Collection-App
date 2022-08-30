const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')  //what we put in the export on auth.js from middleware

const Story = require('../models/Story')


//@desc    Login/Landing Page
//route    GET / 
//get request going to home page '/' , then when we click on homepage we will respond with rendering client to Login (res.send)
router.get('/', ensureGuest, (req, res) => {  //added ensureGuest so anyone not logged in will only see home page
    res.render('login', {
        layout: 'login', //this adds the card (materialize) styling to login page login.hbs from layout folder ; putting whatever is in the body on a card ; div container, div container-content ... 
    })
})

//@desc    Dashboard
//route    GET /dashboard
//when we get request to go to the dashboard page, we will be respond with rendering client to Dashboard
router.get('/dashboard', ensureAuth, async (req, res) => { //added ensureAuth so only ppl logged in can access dashboard - and if youre logged in you stay on dashbaord instead of going to login page again; we are doing this async because now we are hitting the database and watnt ot wait for results to get back first before rendering page
    try {
        const stories = await Story.find({ user: req.user.id }).lean() //
        console.log(req.user)
        res.render('dashboard', {
            name: req.user.firstName,
            stories //we are now passing in the json object above
        })
    }catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

module.exports = router //able to export to any file 