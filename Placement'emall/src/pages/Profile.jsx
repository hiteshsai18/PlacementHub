import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Profile() {
  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  const [name, setName] =
    useState(
      currentUser?.name || ""
    );

  const [
    password,
    setPassword,
  ] = useState("");

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await API.put(
            "/auth/profile",
            {
              name,
              password,
            }
          );

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data
          )
        );

        localStorage.setItem(
          "token",
          res.data.token
        );

        alert(
          "Profile Updated Successfully"
        );

      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Update Failed"
        );
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

        <h1>Profile</h1>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <div>
            <label>
              Name
            </label>

            <br />

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />
          </div>

          <br />

          <div>
            <label>
              New Password
            </label>

            <br />

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />
          </div>

          <br />

          <button
            type="submit"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;