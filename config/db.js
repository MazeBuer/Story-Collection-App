const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB //no () so we are not calling the function. We are exporting it and using it on other files ; we will add it to the top of whatever file we want to add it to (app.js)