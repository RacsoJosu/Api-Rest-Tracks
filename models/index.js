const ENGINE_DB = process.env.ENGINE_DB;

const pathModels = ENGINE_DB ==='nosql' ? "./nosql" :"./mysql"
const models = {
    
    tracksModel: require(`${pathModels}/tracks`),
    usersModel: require(`${pathModels}/users`),
    storagesModel: require(`${pathModels}/storage`)
};

module.exports= models;