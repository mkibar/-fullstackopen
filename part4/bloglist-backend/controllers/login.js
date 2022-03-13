const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  /// Kullanıcıyı bul
  const user = await User.findOne({ username });

  /// Şifrenin doğruluğunu kontrol et
  const passCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  /// Token veri yapısı (değiştirilebilir, models dizinine taşınabilir)
  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  res
    .status(200)
    .send({
      username: user.username,
      name: user.name,
      id: user.id.toString(),
      token,
    });
});

module.exports = loginRouter;
