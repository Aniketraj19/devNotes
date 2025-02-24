const Route = require("express");
const route = Route();
route.use(Route.json());
const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
const zod = require("zod");
const { User, Note } = require("../db");
const cors = require("cors");
route.use(cors());

const emailValid = zod.string().email();
const passValid = zod.string().min(6);

route.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (
    !(
      emailValid.safeParse(email).success &&
      passValid.safeParse(password).success
    )
  ) {
    res.status(400).json({
      reason: "Invalid email or password",
    });
  } else {
    const signup = await User.findOne({ email: email });
    if (signup) {
      res.status(409).send("User alreary exists");
    } else {
      await User.create({
        email: email,
        password: password,
      });
      res.status(200).json({ msg: "SignUp successfull" });
    }
  }
});

route.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const signin = await User.findOne({
    email: email,
    password: password,
  });
  if (!signin) {
    res.status(404).json({
      msg: "User not found",
    });
  } else {
    const token = jwt.sign(password, jwtPassword);
    res.status(200).json({
      msg: "signin successfull",
      token: token,
    });
  }
});

route.listen(3001);
