const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, processenv.JWT_SECRET, { expiresIn: "1h" });
};

exports.registerUser = async (req, res) => {};

exports.loginUser = async (req, res) => {};

exports.getUserInfo = async (req, res) => {};
