const User = require("./user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExist = await User.findOne({ username: username });
    if (!userExist) res.status(400).send("User doesn't exist!");
    const passMatch = await bcrypt.compare(password, userExist.password);
    if (!passMatch) res.status(400).send("Wrong pass!");

    const token = jwt.sign(
      { id: userExist._id, password: userExist.password },
      process.env.JWT_SECRET
    );
    res.send({
      username: userExist.username,
      id: result._id,
      token,
      imgUrl: userExist.profile,
    });
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
});

module.exports = router;
