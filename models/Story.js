const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({    //info we will get back from google auth. about the User logging in 
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {  //first and last name together
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, //user needs to be present
    },
    createdAt: {  //the current date it is created. 
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Story', StorySchema)  //export this as a mongoose model to whatever file we want to add it to (passport.js) ;' will also add a collection of users if it is not currently in your MongoDB datebase. if you have a specific collection you want it to be added to add the 'collection-name' after UserSchema