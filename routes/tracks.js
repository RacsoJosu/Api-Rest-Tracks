// para manejar la ruta se usa express
const express = require("express");
// manejador de las rutas 
// funcion orientada para manejar rutas 
const router = express.Router();
const {validatorCreateItem,validatorGetItem} = require("../validators/tracks")

// traer la funcion desde la carpeta controllers con la destructuracion
const { getItem,getItems, createItem, updateItem, deleteItem } = require("../controllers/tracks");
const customHeader = require("../middleware/customHeader");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");
// aqui vamos a generar la ruta de tracks
// la ruta posee los metodos 
// GET, POST, DELETE, PUT
// http://localhost/tracks

// obetener una lista de cosas




/**
 * Crear una cancion
 * @openapi
 * /tracks:
 *    post:
 *      tags:
 *        - tracks
 *      summary: "Registrar una cancion"
 *      description: Registre una cancion y obtiene el detalle de cada registro
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/tracks"
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *      '403':
 *        description: No tiene permisos '403'
 */
router.post("/",authMiddleware,
checkRol(["user","admin"]),validatorCreateItem,customHeader,createItem);



/**
 * Get track
 * @openapi
 * /tracks/{id}:
 *    get:
 *      tags:
 *        - tracks
 *      summary: "Detalle cancion"
 *      description: Obten el detalle de una cancion
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de canción a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto de la cancion.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/tracks'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/:id",authMiddleware,validatorGetItem,getItem);
/**
 * Get track
 * @openapi
 * /tracks:
 *    get:
 *      tags:
 *        - tracks
 *      summary: "Listar canciones"
 *      description: Obten la lista de canciones
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna el objecto de la cancion.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/tracks'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/",authMiddleware,getItems);


/**
 * Get track
 * @openapi
 * /tracks/{id}:
 *    put:
 *      tags:
 *        - tracks
 *      summary: "Actualzar"
 *      description: Actualizar un registro
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de canción a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: retorna el objeto actualizado.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/tracks'
 *        '422':
 *          description: Error de validacion.
 */
router.put("/:id",authMiddleware,validatorGetItem,validatorCreateItem,updateItem)


/**
 * Get track
 * @openapi
 * /tracks/{id}:
 *    delete:
 *      tags:
 *        - tracks
 *      summary: "Borrar"
 *      description: Borra una cancion 
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de canción a Borrar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objeto borrado.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/tracks'
 *        '422':
 *          description: Error de validacion.
 */
router.delete("/:id",authMiddleware,validatorGetItem,deleteItem)









module.exports= router;