const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

    userName : {type : String,  unique : true, trim : true} 

}, )

module.exports = mongoose.model('Wishup_User' , userSchema)