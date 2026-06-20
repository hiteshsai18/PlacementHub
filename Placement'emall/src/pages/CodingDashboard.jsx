import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function CodingDashboard() {
  const [
    stats,
    setStats,
  ] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats =
    async () => {
      try {
        const res =
          await API.get(
            "/coding-dashboard"
          );

        setStats(
          res.data
        );

      } catch (error) {
        console.log(error);
      }
    };

  if (!stats) {
    return (
      <h2>
        Loading...
      </h2>
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
          Coding Dashboard
        </h1>

        <div>
          <h2>
            Total Challenges:
            {" "}
            {
              stats.totalChallenges
            }
          </h2>

          <h2>
            Solved:
            {" "}
            {
              stats.solved
            }
          </h2>

          <h2>
            Progress:
            {" "}
            {
              stats.progress
            }
            %
          </h2>
        </div>
      </div>
    </div>
  );
}

export default CodingDashboard;