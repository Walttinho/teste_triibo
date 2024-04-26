const userRouter = require("express").Router();
const userController = require("../controller/user");
const middlewareAuthorization = require("../middleware/auth/authorization");

userRouter.post("/", userController.create);
userRouter.post("/login", userController.loginUser);

userRouter.use(middlewareAuthorization);
userRouter.get("/", userController.findAll);
userRouter.get("/:id", userController.findById);
userRouter.delete("/:id", userController.deleteById);
userRouter.put("/:id", userController.updateById);

module.exports = userRouter;
