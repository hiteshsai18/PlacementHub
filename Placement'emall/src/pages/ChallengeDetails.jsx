import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import API from "../services/api";

function ChallengeDetails() {
  const { id } =
    useParams();

  const [
    challenge,
    setChallenge,
  ] = useState(null);

  const [code, setCode] =
    useState("");

  const [
    solved,
    setSolved,
  ] = useState(false);

  useEffect(() => {
    fetchChallenge();
  }, []);

  const fetchChallenge =
    async () => {
      try {
        const res =
          await API.get(
            `/challenges/${id}`
          );

        setChallenge(
          res.data
        );

        setCode(
          res.data
            .starterCode
        );

      } catch (error) {
        console.log(error);
      }
    };

  const submitSolution =
    async () => {
      try {
        await API.post(
          "/submissions",
          {
            challengeId:
              challenge._id,
            code,
            status:
              "Solved",
          }
        );

        setSolved(
          true
        );

        alert(
          "Solution Submitted"
        );

      } catch (error) {
        alert(
          error.response
            ?.data
            ?.message ||
            "Submission Failed"
        );
      }
    };

  if (!challenge) {
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
        {
          challenge.title
        }
      </h1>

      <h3>
        Difficulty:
        {" "}
        {
          challenge.difficulty
        }
      </h3>

      <p>
        {
          challenge.description
        }
      </p>

      {solved && (
        <h2>
          ✅ Solved
        </h2>
      )}

      <textarea
        rows="15"
        style={{
          width: "100%",
        }}
        value={code}
        onChange={(e) =>
          setCode(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <button
        onClick={
          submitSolution
        }
      >
        Submit
      </button>
    </div>
  );
}

export default ChallengeDetails;