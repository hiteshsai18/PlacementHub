import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Results() {
  const [
    results,
    setResults,
  ] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults =
    async () => {
      try {
        const res =
          await API.get(
            "/results"
          );

        setResults(
          res.data
        );

      } catch (error) {
        console.log(error);
      }
    };

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
          Test Results
        </h1>

        {results.map(
          (result) => (
            <div
              key={result._id}
              style={{
                border:
                  "1px solid #ddd",
                padding:
                  "15px",
                marginBottom:
                  "15px",
              }}
            >
              <h3>
                {
                  result.userName
                }
              </h3>

              <p>
                Score:
                {" "}
                {
                  result.score
                }
                /
                {
                  result.totalQuestions
                }
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Results;