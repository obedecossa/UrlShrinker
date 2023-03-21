// Requiring Mongoose and ShortID to create the ShortID
const { default: mongoose } = require('mongoose')
const shortId = require('shortid')

// Creating the Schema of the Urls in the DB
const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    }

})

// Exporting the Urls to the Server
module.exports = mongoose.model('ShortUrl', shortUrlSchema)
