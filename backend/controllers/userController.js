import validator from "validator"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'



const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// route for user login
const loginUser = async(req , res)=>{
  try {
    const {email , password} = req.body;

    const user = await userModel.findOne({email})
    if (!user) {
        return res.json({success:false , messege : "User doesn't exists"})
    } 
    const isMatch = await bcrypt.compare(password , user.password)
    
    if (isMatch) {
        const token = createToken(user._id)
        return res.json({success : true , token})
    }
    else{
        res.json({success: false , messege : "Invalid Credentials"})
    }


  } catch (error) {
       console.log(error);
        res.json({success: false , messege : error.messege})
  }
}


// route for user register
const registerUser = async(req , res)=>{
    try {

        const {name , email , password} = req.body;
        
        // checking user already exists or not
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false , messege:"User Already exists"})
        }

        // validating email formate & strong password
            if (!validator.isEmail(email)) {
                 return res.json({success:false , messege:"Please Enter a Valid Email."})
            }
             if (password.length < 8) {
                 return res.json({success:false , messege:"Please Enter a Strong Password."})
            }
        
        //  hashing user password
        const  salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password , salt)

        const newUser = new userModel({
            name,
            email,
            password : hashPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id)
        res.json({success : true , token})
        
    } catch (error) {
        console.log(error);
        res.json({success: false , messege : error.messege})
        
    }
}


// route for admin login
const adminLogin = async(req , res)=>{
     try {
        const {email , password} = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password , process.env.JWT_SECRET)
            res.json({success : true , token})

        }else{
            res.json({success : false , messege : 'Invalid Credentials'})
        }
        
     } catch (error) {
        console.log(error);
        res.json({success: false , messege : error.messege})
     }
}

export  {loginUser , registerUser , adminLogin}
