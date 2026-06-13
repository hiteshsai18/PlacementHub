const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const companyRoutes =
require("./routes/companyRoutes");
const experienceRoutes =
require(
  "./routes/experienceRoutes"
);
const resultRoutes =
require("./routes/resultRoutes");
dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const questionRoutes =
require("./routes/questionRoutes");
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/api/experiences",
  experienceRoutes
);
app.get("/", (req, res) => {
  res.send("Placement Prep Hub API Running");
});
app.use(
  "/api/companies",
  companyRoutes
);
app.use(
  "/api/results",
  resultRoutes
);
app.use("/api/auth", authRoutes);
app.use(
  "/api/questions",
  questionRoutes
);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});