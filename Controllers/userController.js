const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')
// logic to define register

exports.register = async(req,res) => {
console.log('Inside register controller function');
const {username,email,password} = req.body
try{
    const existingUser = await users.findOne({email})
    if(existingUser){
        res.status(406).json("Account already exist!!! Please Login")
    }else{
        const newUser = new users ({
            username,email,password,github:"",linkedin:"",profile:""
        })
        await newUser.save()
        res.status(200).json(newUser)
    }
    }
    catch(err){
        res.status(401).json(`Register API Failed , Error : ${err}`)
    }
}

// logic to login

exports.login = async(req,res)=>{
    console.log('inside login function');
    const {email,password}= req.body
    try{
      const existingUser = await  users.findOne({email,password})
      if(existingUser){
        const token = jwt.sign({userId:existingUser._id},"supersecretkey12345")
        res.status(200).json({
            existingUser,token
        })
      }else{
        res.status(406).json("Incorrect Email or Password")
      } 
    }
    catch(err){
        res.status(401).json(`Login API Failed, Error : ${err}`)
    }
}

exports.editUser=async(req,res)=>{
    const userId = req.payload
    const{username,email,password,github,linkedin,profile}=req.body
    const UploadImage=req.file?req.file.filename:profile
    try{
        const updatedUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,github,linkedin,profile:UploadImage
        },{new:true})
        await updatedUser.save()
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(401).json(err)
    }
}