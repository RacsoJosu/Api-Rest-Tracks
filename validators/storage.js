const { check } = require("express-validator");
const validateResults = require("../utils/handleValidators");

const validatorGetItem = [
    check("id")
    .exists()
    .notEmpty(),
    (req,res,next) => validateResults(req,res,next)
]


module.exports = {validatorGetItem};