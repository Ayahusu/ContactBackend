const express = require("express");
const { loginUser } = require("../controllers/userControllers");
const { userLoginValidation } = require("../middleware/valiadation");

const router = express.Router();

router.post("/login",userLoginValidation,loginUser)

module.exports = {
    router
}