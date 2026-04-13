import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB connect
mongoose.connect("mongodb+srv://ultrabot805_db_user:giri123@cluster0.0dsdrtc.mongodb.net/quizdb")
  .then(() => console.log("MongoDB Atlas Connected ✅"))
  .catch(err => console.log(err));

// ✅ Schema
const Leaderboard = mongoose.model("Leaderboard", {
  name: String,
  score: Number,
  total: Number,
  date: String
});

// ✅ ROOT ROUTE (IMPORTANT FIX)
app.get("/", (req, res) => {
  res.send("Quiz API Running 🚀");
});

// ✅ Save API
app.post("/save", async (req, res) => {
  const data = new Leaderboard(req.body);
  await data.save();
  res.json({ message: "Saved" });
});

// ✅ Get API
app.get("/leaderboard", async (req, res) => {
  const data = await Leaderboard.find().sort({ score: -1 });
  res.json(data);
});

// ✅ PORT FIX (VERY IMPORTANT for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running 🚀"));