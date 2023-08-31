const express = require("express");

const router = express.Router();

const {createItem,getItems,getItem} = require("../controllers/users")


router.post("/",createItem);
router.get("/", getItems);
router.get("/:id",getItem);




module.exports= router;