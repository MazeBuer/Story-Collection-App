const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middleware/auth')  //what we put in the export on auth.js from middleware

const Story = require('../models/Story')


//@desc    Show add page
//route    GET / stories/add
//get request going to home page '/' , then when we click on homepage we will respond with rendering client to Login (res.send)
router.get('/add', ensureAuth, (req, res) => {  
    res.render('stories/add')
})

//@desc    Process add form
//route    POST /stories
router.post('/', ensureAuth, async (req, res) => {  
    try {
        req.body.user = req.user.id //you can request the data from body by the app.use Body Parser section in app.js
        await Story.create(req.body)
        res.redirect('/dashboard')
    }catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

//@desc    Show all stories
//@route   GET /
router.get('/', ensureAuth, async (req, res) => {  
    try {
        const stories = await Story.find({ status: 'public'})
            .populate('user')
            .sort({ createdAt: 'desc'}) //sorts by date in descending order
            .lean()
        res.render('stories/index', {
            stories,
        })
    }catch (err) {
        console.log(err)
        res.render('error/500')
    }
})

//@desc    Show edit page
//@route   GET / stories/edit/:id
router.get('/edit/:id', ensureAuth, async (req,res) => {  //the edit button route
    const story = await Story.findOne({  //findOne to only find the specific story we want to edit; (by id)
        _id: req.params.id
    }).lean()

    if(!story) {  //
        return res.render('error/404')
    }

    if(story.user != req.user.id) {  //if user logged in is not story of one trying to edit they will be redirected

    }
})

module.exports = router //able to export to any file 