const mongoose = require ("mongoose")
require ("dotenv").config()

const connection = mongoose.connect(proess.env.mongoUrl)

module.exports={connection}