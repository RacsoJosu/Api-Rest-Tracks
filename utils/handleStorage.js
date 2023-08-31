const multer = require("multer")

const storage = multer.diskStorage({
    destination:function(req,filename,callback){
        const pathStorage=`${__dirname}/../storage`;
        callback(null,pathStorage)
    },
    filename:function(req,filename,callback){
        // obtener extencion
        const ext = filename.originalname.split(".").pop();
        const file = `file-${Date.now()}.${ext}`;
        callback(null,file)

    }
}); 


const uploadMiddleware =  multer({storage})

module.exports = {uploadMiddleware}