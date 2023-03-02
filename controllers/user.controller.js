const { createuserService, findUserByEmail } = require("../services/user.service")
const { genarateToken } = require("../utils/token")

exports.signup=async(req,res)=>{

    try {
        const user= await createuserService(req.body)
        const signup= await user.save()
        res.status(200).json({
            status:"success",
            message :'successfully sign up',
            userInfo:signup
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message :'failed sign up',
            error:error.message
        })
    }
}

//login
/**
 * 1. check email and password ar given
 * 2.load user with email
 * 3.if user send res
 * 4.compare password
 * 5.if password correct send res
 * 6.if user is active
 * 7.if not acctive send res
 * 8.ganerate tocken
 * 9. send user a tocken
 */
exports.login=async(req,res)=>{

    try {
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(401).json({
                status:"fail",
                message:"pleace provide valiad email and password"
            })
        }

        const user= await findUserByEmail(email)
        if(!user){
            return res.status(401).json({
                status:"fail",
                message:"no user found,please create a account"
            })
        }

        const isPasswordValid=user.comparePassword(password,user.password)
        if(!isPasswordValid){
            return res.status(401).json({
                status:"fail",
                message:"password not correct"
            })
        }
        
        if(user.status!="active"){
            return res.status(401).json({
                status:"fail",
                message:"you account is not active yet"
            })
        }

        //token genarate

        const token= genarateToken(user);   
        const {password:pwd,...others}=user.toObject() 
        res.status(200).json({
            status:"success",
            message :'successfully logged in',
            data:{
                user:others,
                token
            }
       })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message :'failed sign up',
            error:error.message
        })
    }
}