const userRouter = require("express").Router();
const userController = require("../controller/user");

userRouter.post("/", userController.create)


module.exports = userRouter