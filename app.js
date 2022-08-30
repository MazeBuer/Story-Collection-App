const path = require('path') //creates an absolute path (an express built in module)
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars') //middleware
const passport = require('passport')  //passport is a authentication middleware for Node.js for Google authen.
const session = require('express-session')
const MongoStore = require('connect-mongo') //for storing session and keeps you logged in
const connectDB = require('./config/db') //exported from file db.js in config folder
const { default: mongoose } = require('mongoose')


//Load config
dotenv.config({ path: './config/config.env'})

//Passport config
require('./config/passport')(passport)

connectDB()

const app = express()

//Body parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Logging
//if the development (not production) is running for NODE_ENV we will use morgan 
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//Handlebars Helpers
const { formatDate, stripTags, truncate, editIcon } = require('./helpers/hbs')

//Handlebars
app.engine('.hbs', exphbs.engine(  //need to add engine after exphbs
    { helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
    },defaultLayout: 'main', //we declared a default layout here, if we want to specify we specify in index.js page and layout: __
    extname: '.hbs'
    })
);
app.set('view engine', '.hbs')


//Sessions - must be above passport middleware ; part of passport; find code in the docs
app.use(session({
    secret: 'keyboard cat',
    resave: false, //we dont want to save session when nothing changes
    saveUninitialized: false, //dont create session until something is stored
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    }) //for storing session and keeps you logged in - creates a session on MongoDB to save the session
    
}))

//Passport Middleware - can find in the docs in website
app.use(passport.initialize())
app.use(passport.session())


//Set global variable
app.use(function (req,res, next) { //call next to go onto next middleware
    res.locals.user = req.user || null
    next()
})

//Static Folder
app.use(express.static(path.join(__dirname, 'public'))) //will set up our static folder (styles css and other styling folders) and add them and override what materialize (the link in main.hbs that gives some style) does ; inside our public folder will be the css and other styling files

//Routes - 
//we are getting the exported router from index.js file and auth.js file now we can check browser and put 'localhost:3500/dashboard' or whatever route and we will see what is in that page
app.use('/', require('./routes/index')) //index.js file is inside the routes folder
//even tho dont has specific route for dashboard, it can still read index.js and see you have route for dashboard
app.use('/auth', require('./routes/auth')) //add other file auth from routes folder
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`))