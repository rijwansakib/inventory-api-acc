const jwt= require("jsonwebtoken")
exports.genarateToken = (userInfo) =>{
    const payload={
        email:userInfo.email,
        role:userInfo.role
    }

    const token =jwt.sign(payload,process.env.TOKEN_SECRET,{
        expiresIn:"20"
    })

    return token;
}