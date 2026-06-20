import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Challenges() {
  const [challenges, setChallenges] =
    useState([]);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges =
    async () => {
      try {
        const res =
          await API.get(
            "/challenges"
          );

        setChallenges(
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
        Coding Challenges
      </h1>

      {challenges.map(
        (challenge) => (
          <div
            key={
              challenge._id
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
                challenge.title
              }
            </h3>

            <p>
              Difficulty:
              {" "}
              {
                challenge.difficulty
              }
            </p>

            <Link
              to={`/challenges/${challenge._id}`}
            >
              Solve Challenge
            </Link>
          </div>
        )
      )}
    </div>
  );
}

export default Challenges;