const express = required("express");
const mongoose = required("mongoose");
const cors = required("cors");
required("dotenv").config();

const authRoutes = required("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error: ", err));

const PORT = process.env || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
