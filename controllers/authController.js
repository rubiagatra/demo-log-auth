const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var users = [
  {
    username: "doni",
    password: "$2a$10$FxhKRwOMc9na32dITrEqhuW8yBglQSyib8XZAXYN2Czdyf9vCn/UC",
  },
];

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      username,
      password: hashedPassword,
    };
    users.push(user);

    res.status(201).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

function getUserByUsername(username) {
  return users.find((user) => user.username === username);
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = getUserByUsername(username);

    if (!user) return res.status(404).send({ message: "user not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).send({ message: "invalid password" });

    const token = jwt.sign({ username: user.username }, "secret", {
      expiresIn: "1h",
    });
    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
