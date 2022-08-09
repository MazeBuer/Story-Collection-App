const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function(passport) {  //in app.js we passed the passport into
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {  //profile of the user needed, and done is callback once completed
        console.log(profile)
        const newUser = {
            googleId: profile.id,  //privides everything that is console.log of user information on google
            displayName: profile.displayName,  //info from the google object given. goes to displayName and its first name
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }
        try {
            let user = await User.findOne( {googleId: profile.Id}) //checking to see if they are already on database, if they are dont add them again

            if(user) {
                done(null, user) //user exists and pass back the user data
            }else {  //if no user yet create a new one
                user = await User.create(newUser) //adds the user to MongoDB
                done(null, user)  //now brings back info of user
            }
        }catch (err) {
            console.error(err)
        }
    }))

    passport.serializeUser(function (user, done) {  //got below 2 passport. from passport site docs. needed to support login sessions
        done(null, user.id)
    })

    passport.deserializeUser(function (id,done) {  //in site docs ; needed to support login sessions
        User.findById(id, function (err, user) {
            done(err, user)
        })
    })
}