const router = require("express").Router();
const swaggerRouter = require("./swaggerRouter");
const userRouter = require("./userRouter");

router.use("/user", userRouter);

router.use("/docs", swaggerRouter);

module.exports = router;
