const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:[3, 'Must be at least 3 ,get {VALUE}']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password:{
        type:String,
        required:true,       
    },
    github:{
        type:String,       
    },
    linkedin:{
        type:String,
    },
    profile:{
        type:String,
    },    
})

const users = mongoose.model("users",userSchema)

module.exports = users