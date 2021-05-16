const User = require("./user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { username, password, password2 } = req.body;
    const userExist = await User.findOne({ username: username });
    if (userExist) res.status(400).send("Please choose unique name!");
    if (username.trim().length < 1)
      res.status(400).send("Username can't be blank!");

    if (password !== password2)
      res.status(400).send("Passwords doesn't match!");

    if (password.length < 4)
      res.status(400).send("Password must be more than 4 chars!");

    const hashedPass = await bcrypt.hash(password, 12);
    const result = await User.create({ username, password: hashedPass });
    const token = jwt.sign(
      { id: result._id, password: hashedPass },
      process.env.JWT_SECRET
    );
    res.send({
      username: result.username,
      id: result._id,
      token,
      imgUrl: result.profile,
    });
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
});

module.exports = router;
