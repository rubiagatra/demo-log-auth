const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  console.log(token);
  if (!token) return res.status(401).send({ message: "access denied" });

  jwt.verify(token, "secret", (err, user) => {
    if (err) return res.status(401).send({ message: "invalid token" });
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
