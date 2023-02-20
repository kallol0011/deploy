
const mongoose = require ("mongoose")

const authSchema=mongoose.Schema({

    name:String,
    email:String,
    gender:String,
    password:String,
    
    age:Number,
    city:String,
})

const authModel = mongoose.model("user",authSchema)


module.exports={authModel}
