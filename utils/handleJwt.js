const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET
const getProperties = require("../utils/handlePropertiesEngine")
const propertiesKey= getProperties()
/**
 * generar el token 
 * @param {*} user
 */

const tokenSign = async (user)=>{
    const sign = jwt.sign(
        {
            [propertiesKey.id]:user[propertiesKey.id],
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h",

        }
    );

    return sign

}

/**
 * verificar token
 * @param {*} token
 * pasar el token de inicio de sesion 
 */

const verifyToken = async (tokenJwt)=>{

    try {
        return jwt.verify(tokenJwt,JWT_SECRET)
        
    } catch (error) {
        console.log(error)
        return null
    }

}

module.exports = {tokenSign,verifyToken}