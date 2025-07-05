const {expressjwt:expressjwt} = require("express-jwt")


function authjwt(){
    const secret = process.env.secret
    return expressjwt({
        secret,
        algorithms:["HS256"],
        isRevoked:isRevoked
    }).unless({
        path:[
            {url:/\api\/v1\/product(.*)/,method:["GET","OPTIONS"]},
              {url:/\api\/v1\/Category(.*)/,method:["GET","OPTIONS"]},
            "/api/v1/users/login",
            "/api/v1/users/register"
            
        ]
    });
}
async function isRevoked(req,token) {
    if(!token.payload.isadmin){
        return true
    }
    return false
}
module.exports = authjwt