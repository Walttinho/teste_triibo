const jwt = require("jsonwebtoken");
const { findById } = require("../../model/user");

const middlewareAuthorization = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(401)
        .send({ message: "No authorization header provided" });
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.status(401).send({ message: "Invalid authorization header" });
    }

    const [schema, token] = parts;

    if (schema !== "Bearer") {
      return res.status(401).send({ message: "Invalid authorization schema" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Invalid token" });
      }

      const user = await findById(decoded.id);

      if (!user || !user.id) {
        return res.status(401).send({ message: "Invalid token" });
      }
      req.userId = user._id;

      return next();
    });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).send({ message: "Authentication error" });
  }
};

module.exports = middlewareAuthorization;
