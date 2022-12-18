import jwt from 'jsonwebtoken';

interface userTokenData{
    name:String
}

const userTokenGenerator =(userData:userTokenData):String=>{
    const userToken:String = jwt.sign(userData,process.env.USER_SECRET_TOKEN,{algorithm:"HS512"})

    return userToken
}

export default userTokenGenerator