import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

function Dashboard() {
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
            "/dashboard"
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
        padding: "20px",
      }}
    >
      <h1>
        Welcome,
        {" "}
        {stats.name}
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2,1fr)",
          gap: "20px",
          marginTop:
            "20px",
        }}
      >
        <div
          style={{
            border:
              "1px solid #ddd",
            padding:
              "20px",
          }}
        >
          <h2>
            Tests Taken
          </h2>

          <h1>
            {
              stats.testsTaken
            }
          </h1>
        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            padding:
              "20px",
          }}
        >
          <h2>
            Best Score
          </h2>

          <h1>
            {
              stats.bestScore
            }
          </h1>
        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            padding:
              "20px",
          }}
        >
          <h2>
            Average Score
          </h2>

          <h1>
            {
              stats.averageScore
            }
          </h1>
        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            padding:
              "20px",
          }}
        >
          <h2>
            Experiences Shared
          </h2>

          <h1>
            {
              stats.experiencesShared
            }
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;