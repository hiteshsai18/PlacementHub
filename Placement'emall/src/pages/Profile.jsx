import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "20px",
        }}
      >
        <Navbar />

        <h1>Profile</h1>

        <h3>Name: {user?.name}</h3>

        <h3>Email: {user?.email}</h3>
      </div>
    </div>
  );
}

export default Profile;