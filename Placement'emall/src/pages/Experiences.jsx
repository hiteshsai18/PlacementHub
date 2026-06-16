import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Experiences() {
  const [
    experiences,
    setExperiences,
  ] = useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences =
    async () => {
      try {
        const res =
          await API.get(
            "/experiences"
          );

        setExperiences(
          res.data
        );

      } catch (error) {
        console.log(error);
      }
    };

  const filteredExperiences =
    experiences.filter(
      (experience) =>
        experience.company
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        experience.content
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
          Interview Experiences
        </h1>

        <input
          type="text"
          placeholder="Search Experience"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <br />
        <br />

        {filteredExperiences.map(
          (
            experience
          ) => (
            <div
              key={
                experience._id
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
                  experience.company
                }
              </h3>

              <p>
                {
                  experience.content
                }
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Experiences;