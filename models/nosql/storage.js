const mongoose = require("mongoose");
// nuestra esquema 
const StorageScheme = new mongoose.Schema(
    {
        // coleccion de usuarios aqui estaria las propiedades de la tabla 
        url:{
            type:String,
        },
        filename:{
            type:String,

        }



    },
    {
        timestamps:true, //tenemos la hora y fecha de chreaciony actualizacion
        versionKey:false 

    }

);

// exportacion del modulo
// el primer argumento es el nombre de la coleccion en mysql seria el nombre de la tabla 
module.exports = mongoose.model("storages",StorageScheme);