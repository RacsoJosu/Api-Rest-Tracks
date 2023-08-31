require("dotenv").config()
const  express = require("express")

// esto es como un plugin que usamos para mejorar, hacemos uso de cors
//  nos ayuda a no cometer errores cruzados con los navegadores
const  cors = require("cors");
const dbConnectNoSql = require("./config/mongo");
const {dbConnectMySql} = require("./config/mysql");  
const NODE_ENV = process.env.NODE_ENV || "development"
const app = express();
const openApiConfig = require("./docs/swagger.js");
const swaggerUI = require("swagger-ui-express");
const engineDB = process.env.ENGINE_DB;

app.use(cors())
//decirle a la aplicacion que este preparado para recibir inofmracion 
app.use(express.json())

//para acceder a los archivos de datos publicos
app.use(express.static("storage"))
// el puerto que utilizamos 
const port = process.env.PORT || 3000



/**
 * definir ruta de documentacion
 */
app.use('/documentation',swaggerUI.serve)
app.get('/documentation',swaggerUI.setup(openApiConfig))


/**
 * 
 * aqui vamos a invocar nuestras rutas 
 */

app.use("/api",require("./routes"));

// {
//     name: 'Nomnbre',
//     album: 'Album',
//     cover: 'http://tttt.com',
//     artist: { name: 'nombre', nickname: 'apodo', nationality: 'VE' },
//     duration: { start: 1, end: 0 },
//     mediaId: '62e7499a1f699063f5114bc'
//   }







//  la aplicacion escucha a traves del puerto y nos devuelva un mensaje

if (NODE_ENV!=="test") {
    app.listen(port);
    
}


(engineDB === 'nosql' ) ? dbConnectNoSql() : dbConnectMySql();

module.exports = app