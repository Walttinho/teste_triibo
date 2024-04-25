const userRouter = require("express").Router();
const userController = require("../controller/user");

userRouter.post("/", userController.create)
userRouter.get("/", userController.findAll)
userRouter.get("/:id", userController.findById)
userRouter.delete("/:id", userController.deleteById)


module.exports = userRouter