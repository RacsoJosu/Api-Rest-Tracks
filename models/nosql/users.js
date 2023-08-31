const mongoose = require("mongoose");
// nuestra esquema 
const UserScheme = new mongoose.Schema(
    {
        // coleccion de usuarios aqui estaria las propiedades de la tabla 
        name:{
            type:String,
        },
        age:{
            type:Number,
        },
        email:{
            type:String,
            unique:true,
        },
        password:{
            type:String,
            select:false

        },
        role :{
            type:["user","admin"],
            default:"user",
        }




    },
    {
        timestamps:true, //tenemos la hora y fecha de chreaciony actualizacion
        versionKey:false 

    }

);

// exportacion del modulo
// el primer argumento es el nombre de la coleccion en mysql seria el nombre de la tabla 
module.exports = mongoose.model("users",UserScheme);