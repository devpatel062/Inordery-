const { Int32 } = require("mongodb")
const mongoose = require("mongoose")
const validator = require("validator")

const order = mongoose.model("order",{
    // id : {
    //     type : String,
    //     unique : true,
        
    // },
    username : {
        type: String,
        trim: true,
        required : true
    },
    phone : {
        type : Number,
        required : true,
       
    },
    date : {
        type : Date,
        default : Date.now,
    },
    ispending : {
        type : String,
        default : true,
    },
    items : {
        // type : [{
        //     title : {type : String,requied : true},
        //     category : {type : Number,required : true},
        //     img : {type : String,required : true},
        //     desc: {type : String , required : true},
        //     price : {type : String,required : true},
        //     amount : {type : Number,required : true}
        // }],
        type : Array,
        required: true
        
    }


})

module.exports = order