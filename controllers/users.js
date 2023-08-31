const {usersModel} = require("../models")
const {encrypt,compare} = require("../utils/handlePassword")
const { matchedData } = require("express-validator");
const {tokenSign,verifyToken} = require("../utils/handleJwt");
const {handleHttpError} = require("../utils/handleError")

const getItems = async (req,res) => {
    const data = await usersModel.find({});

    res.send({data})
}

const createItem = async (req,res) => {
    const {body} =req
    const data = await usersModel.create(body);
    console.log(data)
    res.send({data})

}

const getItem= async (req,res)=>{
    const data = await usersModel.find({
    });

    res.send({data})
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * encargado para registrar una persona
 */

const registerUser = async (req,res)=>{
    try{
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = { ...req, password };
        const dataUser = await usersModel.create(body);
        dataUser.set("password", undefined, { strict: false });
      
        const data = {
          token: await tokenSign(dataUser),
          user: dataUser,
        };
        res.status(201)
        res.send({ data });
      }catch(e){
        console.log(e)
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
}
/**
 * encargado de logear un usuarip
 * @param {*} req 
 * @param {*} res 
*/

const loginCtrl = async (req,res) =>{
    

    try {
        
        req = matchedData(req);
       
        const user = await usersModel.findOne({email:req.email}).select("email password age")

      
        if (!user) {
            handleHttpError(res,"USER_NOT_EXISTS",404)
            return
        }
        const hashPassword= user.get("password");
        
        const check = await compare(req.password,hashPassword)
       
        if (!check) {
            handleHttpError(res,"PASSWORD_INVALID",401)
            return
        }
        
        user.set('password',undefined,{strict:false})
        const data= {
            token: await tokenSign(user),
            user
        }
        res.send({data})
        
    } catch (error) {
        console.log(error)
        
        handleHttpError(res,"HTTP_ERROR_LOGIN_USER")
    }

}


module.exports = {getItems,createItem,getItem,registerUser,loginCtrl}