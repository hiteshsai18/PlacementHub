import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Analytics() {
  const [
    analytics,
    setAnalytics,
  ] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics =
    async () => {
      try {
        const res =
          await API.get(
            "/results/analytics"
          );

        setAnalytics(
          res.data
        );

      } catch (error) {
        console.log(error);
      }
    };

  if (!analytics) {
    return (
      <div
        style={{
          display: "flex",
        }}
      >
        <Sidebar />

        <div
          style={{
            flex: 1,
            padding: "20px",
          }}
        >
          <Navbar />
          <h2>
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "20px",
        }}
      >
        <Navbar />

        <h1>
          Analytics Dashboard
        </h1>

        <div>
          <h3>
            Tests Taken:
            {" "}
            {
              analytics.testsTaken
            }
          </h3>

          <h3>
            Best Score:
            {" "}
            {
              analytics.bestScore
            }
          </h3>

          <h3>
            Average Score:
            {" "}
            {
              analytics.averageScore
            }
          </h3>

          <h3>
            Latest Score:
            {" "}
            {
              analytics.latestScore
            }
          </h3>
        </div>

        <div
          style={{
            width: "100%",
            height: "400px",
            marginTop:
              "30px",
          }}
        >
          <ResponsiveContainer>
            <LineChart
              data={
                analytics.chartData
              }
            >
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="test"
              />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="score"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analytics;