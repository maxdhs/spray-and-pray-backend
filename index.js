const express = require("express");
const prisma = require("./prisma");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.send({ success: true, users });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});

app.put("/users/:userId", async (req, res) => {
  try {
    const { count, name } = req.body;
    const user = await prisma.user.update({
      where: { id: req.params.userId },
      data: { count, name },
    });
    res.send({ success: true, user });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name } = req.body;
    const user = await prisma.user.create({
      data: { name },
    });
    res.send({ success: true, user });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});

app.delete("/users/:userId", async (req, res) => {
  try {
    const user = await prisma.user.delete({ where: { id: req.params.userId } });
    res.send({ success: true, user });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});

app.use((req, res) => {
  res.send({ success: false, error: "No route found." });
});

app.use((error, req, res, next) => {
  res.send({ success: false, error: error.message });
});

app.listen(3000, () => console.log("server is up"));
