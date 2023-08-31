const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDefinition ={
    openapi:"3.0.0",
    info:{
        title:"Documentacion de mi API Curso de Node Rest",
        version:"1.0.1",
    },
    servers:[{
        url:"/api"
    },
    {
        url:"http:://localhost:3002/api"
    }
    ],
    components:{
        securitySchemes:{
            bearerAuth:{
                type:"http",
                scheme:"bearer"
            },
        },
        schemas:{
            tracks:{
                type:"object",
                required:[""],
                properties:{
                    name:{type:"string"},
                    album:{type:"string"},
                    cover:{type:"string"},
                    artist:{
                        type:"object",
                        properties:{
                            name:{type:"string"},
                            nickname:{type:"string"},
                            nationality:{type:"string"},
                        }
                    },duration:{
                        type:"object",
                        properties:{
                            start:{type:"integer"},
                            end:{type:"integer"}
                        }
                    },mediaId:{
                        type:"string"
                    }
                }
            },
            users:{
                type:"object",
                required:[""],
                properties:{
                    name:{type:"string"},
                    age:{type:"integer"},
                    email:{type:"string"},
                    password:{type:"string"},
                    role:{
                        type:"string",
                        enum:["admin","user"]
                    },
                }
            },
            storage:{
                type:"object",
                required:[""],
                properties:{
                    url:{type:"string"},
                    filename:{type:"string"}
                }
            },authLogin:{
                type:"object",
                required:["email","password"],
                properties:{
                    email:{type:"string"},
                    password:{type:"string"}
                }
            },authRegister:{
                type:"object",
                required:["email","password","age","name"],
                properties:{
                    name:{type:"string"},
                    password:{type:"string"},
                    email:{type:"string"},
                    age:{type:"integer"},
                }
            }
        }

    }
}



const options = {
    swaggerDefinition,
    // ruta de las rutas 
    apis:["./routes/*.js"]

}
const openApiConfig= swaggerJSDoc(options)

module.exports = openApiConfig