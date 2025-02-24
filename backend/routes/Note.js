const Route = require("express");
const route = Route();
const { Note } = require("../db");
const authMiddleWare = require("../middleware/authMiddleWare");

route.get("/note", authMiddleWare, async (req, res) => {});

route.listen(3002);
