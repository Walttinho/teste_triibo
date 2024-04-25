const userRouter = require("express").Router();
const userController = require("../controller/user");

userRouter.post("/", userController.create)
userRouter.get("/", userController.findAll)


module.exports = userRouter