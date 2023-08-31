const mongoose = require("mongoose");
// nuestra esquema 
const TracksScheme = new mongoose.Schema(
    {
        // coleccion de usuarios aqui estaria las propiedades de la tabla 
        name:{
            type:String,
        },
        
        album:{
            type:String,
        },
        cover:{
            type:String,
            validate:{
                validator:(req)=>{
                    return true;

                },
                message:"ERROR_URL",
            },

        },
        artist :{
            name:{
                type:String,
            },
            nickname:{
                type:String,
            },
            nationality:{
                type: String,
            },
        },
        duration:{
            start:{
                type:Number,
            },
            end:{
                type:Number,
            },
        },
        mediaId:{
            type:mongoose.Types.ObjectId
        },
    },
    {
        timestamps:true, //tenemos la hora y fecha de chreaciony actualizacion
        versionKey:false

    }

);

/**
 * metodo propio para la relacion con storage
 */
TracksScheme.statics.findAllData = function() {
    const joinData =this.aggregate([
        {
            $lookup:{
                from:"storages",
                localField:"mediaId",
                foreignField:"_id",
                as:"audio",
            },
            
        },
        {
            $unwind:"$audio"
        }
    ]);

    return joinData;
};
/**
 * metodo propio para la relacion con storage
 */
TracksScheme.statics.findOneData = function(id) {
    const joinData =this.aggregate([
        {
            $match:{
                _id:mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup:{
                from:"storages",
                localField:"mediaId",
                foreignField:"_id",
                as:"audio",
            },
            
        },
        {
            $unwind:"$audio"
        },
    ]);

    return joinData;
};



// exportacion del modulo
// el primer argumento es el nombre de la coleccion en mysql seria el nombre de la tabla 
module.exports = mongoose.model("tracks",TracksScheme);