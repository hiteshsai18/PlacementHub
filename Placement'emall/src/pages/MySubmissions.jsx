import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

function MySubmissions() {
  const [
    submissions,
    setSubmissions,
  ] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions =
    async () => {
      try {
        const res =
          await API.get(
            "/submissions/my"
          );

        setSubmissions(
          res.data
        );

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>
        My Submissions
      </h1>

      {submissions.map(
        (
          submission
        ) => (
          <div
            key={
              submission._id
            }
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
                submission
                  .challenge
                  .title
              }
            </h3>

            <p>
              Difficulty:
              {" "}
              {
                submission
                  .challenge
                  .difficulty
              }
            </p>

            <p>
              Status:
              {" "}
              {
                submission.status
              }
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default MySubmissions;