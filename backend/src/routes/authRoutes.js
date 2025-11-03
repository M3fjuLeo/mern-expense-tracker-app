const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authController");

const router = express.Router();

// Rejestracja nowego użytkownika
router.post("/register", registerUser);

// Logowanie użytkownika
router.post("/login", loginUser);

// Pobranie danych użytkownika (wymaga tokena)
router.get("/getUser", protect, getUserInfo);

// Upload avatara
router.post("/upload-image", upload.single("avatar"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ message: "Error uploading file" });
  }
});

module.exports = router;
