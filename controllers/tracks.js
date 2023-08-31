// el controlador va tener la logica de la aplicacion
// donde se va a conectar la base de datos 
// donde va a finalizar el usuario
//   el lugar donde se van hacer las operaciones
// como parametro las funciones van a recibir lo que nos enva express
// el request, respones

// necesito los modelos 
// con esta declaracion estoy haciendo un llamado a los modelos de la carpeta models 
const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

/**
 * Obtener una lista de la base de datos.
 * @param {*} req 
 * @param {*} res 
 */

/**
 * este es mi controlador de la base de datos para traer 
 * informacion del modelo 
 */
const getItems = async (req, res) => {
    // aqui estamos buscando todo desde la base de datos o en la base de
    // datos
    const data = await tracksModel.findAllData({});
    res.send({ data });
}

/**
 * va obtener un registro de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res)=>{
    const {id} = matchedData(req)
    const data = await tracksModel.findOneData(id)
    res.send({ data });
};



/**
 * borrar un regstro de la base de datos
 * @param {*} req 
 * @param {*} res 
 */

const deleteItem = async (req, res)=>{
    
    try {
        
        const {id} = matchedData(req);
        const data = await tracksModel.findOneAndDelete(id)

        res.send({data})
        
        
    } catch (error) {
        console.log(error)
        handleHttpError(res,"ERROR_DELETE_ITEM");
    }
};




/**
 * va actualizar un registro de la base de datos 
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res)=>{
    
    try {
        const {id, ...body} = matchedData(req)
        const data = await tracksModel.findOneAndUpdate(
            id,body
        );

        res.send({data})
    } catch (error) {
        console.log(error)
        handleHttpError(res,"ERROR_UPDATE_ITEM")
        
    }



};

/**
 * va crear un registro de la base de datos 
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res)=>{
    const { body }  = req;
   
    const data = await tracksModel.create(body);
    res.send({data});

};


// exportar la funcion aplicando deEstructuracion
module.exports ={getItems,getItem,deleteItem,updateItem,createItem};