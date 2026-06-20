const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const companyRoutes =
require("./routes/companyRoutes");
const experienceRoutes =
require(
  "./routes/experienceRoutes"
);
const codingDashboardRoutes =
require(
"./routes/codingDashboardRoutes"
);
const dashboardRoutes =
  require(
    "./routes/dashboardRoutes"
  );
  const {
  notFound,
  errorHandler,
} = require(
  "./middleware/errorMiddleware"
);
const challengeRoutes =
require(
"./routes/challengeRoutes"
);

const submissionRoutes =
require(
"./routes/submissionRoutes"
);
const resultRoutes =
require("./routes/resultRoutes");
dotenv.config();
const leaderboardRoutes =
require("./routes/leaderboardRoutes");
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
app.use(
"/api/coding-dashboard",
codingDashboardRoutes
);
app.use(
  "/api/dashboard",
  dashboardRoutes
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
app.use(
"/api/challenges",
challengeRoutes
);

app.use(
"/api/submissions",
submissionRoutes
);
app.use(
  "/api/leaderboard",
  leaderboardRoutes
);
const PORT = process.env.PORT || 5000;
app.use(notFound);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});