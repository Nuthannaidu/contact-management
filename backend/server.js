const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://contact-management-1-1fpw.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log("Server running on port", PORT)
);
