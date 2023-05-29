const mongoose = require("mongoose")

const menu = mongoose.model('menu',{
   
    title : {
        type : String,
        required : true,
        trim :true
    },
    // _id : {
    //     type : Number,
    //     required : true,
    //     trim :true
    // },
    category:{
        type: String,
        required : true,
        trim :true
    },
    img:{
        type: String,
        required : true,
        trim :true
    },
    desc :{
        type: String,
        trim : true,
    },
    price : {
        type : String,
        required :true,
        trim : true
    },
    amount:{
        type : Number,
        default : 1
    }
})

module.exports = menu