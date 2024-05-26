const express = require("express");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();
const port = 3000;

// Middlwares
app.use(express.json());
app.use(morgan("dev"));

// Routing
app.get("/", authMiddleware, (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);

// Example route where a JavaScript error might occur
app.get("/hello", (req, res) => {
  const obj = null;
  try {
    const user = getUser();
    const barang = getBarang();
    const produk = getProduk();
    const result = obj.someProperty; // This will throw a TypeError
    res.send({ result });
  } catch (err) {
    console.error(err.stack); // Log error stack
    res.status(500).send({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
