// para manejar la ruta se usa express
const express = require("express");


// manejador de las rutas 
// funcion orientada para manejar rutas 
const router = express.Router();
// filesystem
const fs = require("fs");
// me devuelve la ubicacion de las rutas 
const PATH_ROUTES = __dirname;
const removeExtension = (fileName)=>{
    return fileName.split(".").shift()
}



// leer el directorio de forma sincrona
fs.readdirSync(PATH_ROUTES).filter((file)=>{
    const name = removeExtension(file);
    if (name !== 'index') {
        console.log(`cargando ruta ${name}`);
        router.use(`/${name}`,require(`./${file}`));
        
    }
});




module.exports= router;


















module.exports= router