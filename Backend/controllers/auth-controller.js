const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

const generateToken = (name) => {
  try {
    token = jwt.sign({ name: name }, "super_secret_dont_share", {
      expiresIn: "1h",
    });
    return token;
  } catch (err) {
    const error = new HttpError("Logging in failed, please try again.", 500);
    throw error;
  }
};

const login = async (req, res, next) => {
  const { name } = req.body;

  let token;
  try {
    token = generateToken(name);
  } catch (err) {
    return next(err);
  }

  res.status(200).json({ token: token, message: "Logged in successfully" });
};

module.exports = {
  login,
};
