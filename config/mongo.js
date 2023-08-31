const mongoose = require("mongoose");

const dbConnect = () =>{
    const DB_URI = process.env.DB_URI;
    mongoose.set("strictQuery",false)
    mongoose.connect(
        DB_URI, 
        {
        // configuracion de la conexion 
        useNewUrlParser: true,
        useUnifiedTopology: true
        },(err,res)=> {
        if (!err) {
            console.log("********* CONEXION CORRECTA ********")
            
        }else{
            console.log("********* ERROR DE CONEXION ********")
        }
        }
    );

}

// para importar un modulo que necesitamos usar en otro lado usamos 
module.exports = dbConnect
