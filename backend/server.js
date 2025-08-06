const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./config/db.config.js");

const authRoutes = require("./routes/auth.routes.js");
const postRoutes = require("./routes/post.routes.js");
const userRoutes = require("./routes/user.routes.js");

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());
// CORS config
app.use(
  cors({
    origin: process.env.CLIENT_URI,
    credentials: true,
  })
);

connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Server is active!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
