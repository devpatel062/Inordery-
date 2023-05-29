const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/inordery",{
    useNewUrlParser:true
}).then((err,data)=>
{console.log("Connected to Database")})