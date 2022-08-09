const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({    //info we will get back from google auth. about the User logging in 
    googleId: {
        type: String,
        required: true
    },
    displayName: {  //first and last name together
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    createdAt: {  //the current date it is created. 
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema)  //export this as a mongoose model to whatever file we want to add it to (passport.js) ;' will also add a collection of users if it is not currently in your MongoDB datebase. if you have a specific collection you want it to be added to add the 'collection-name' after UserSchema