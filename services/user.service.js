const user = require("../models/user")

exports.createuserService = async (userInfo) =>{
    const result = await user.create(userInfo)
    return result;
}

exports.findUserByEmail= async(email)=>{
    return await user.findOne({email})
}