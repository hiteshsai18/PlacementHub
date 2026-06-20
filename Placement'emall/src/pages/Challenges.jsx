import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Challenges() {
  const [
    challenges,
    setChallenges,
  ] = useState([]);

  const [search, setSearch] =
    useState("");

  const [
    difficulty,
    setDifficulty,
  ] = useState("");

  useEffect(() => {
    fetchChallenges();
  }, [difficulty]);

  const fetchChallenges =
    async () => {
      try {
        const url =
          difficulty
            ? `/challenges?difficulty=${difficulty}`
            : "/challenges";

        const res =
          await API.get(
            url
          );

        setChallenges(
          res.data
        );

      } catch (error) {
        console.log(error);
      }
    };

  const filtered =
    challenges.filter(
      (challenge) =>
        challenge.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

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
          Coding Challenges
        </h1>

        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <select
          value={
            difficulty
          }
          onChange={(e) =>
            setDifficulty(
              e.target.value
            )
          }
        >
          <option value="">
            All
          </option>

          <option>
            Easy
          </option>

          <option>
            Medium
          </option>

          <option>
            Hard
          </option>
        </select>

        <br />
        <br />

        {filtered.map(
          (
            challenge
          ) => (
            <div
              key={
                challenge._id
              }
            >
              <h3>
                {
                  challenge.title
                }
              </h3>

              <p>
                {
                  challenge.difficulty
                }
              </p>

              <Link
                to={`/challenges/${challenge._id}`}
              >
                Open
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Challenges;