import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const user = JSON.parse(
    localStorage.getItem("user")
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

        <h1>Dashboard</h1>

        <h3>
          Welcome {user?.name}
        </h3>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
            }}
          >
            Aptitude Questions

            <h2>250</h2>
          </div>

          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
            }}
          >
            Companies

            <h2>15</h2>
          </div>

          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
            }}
          >
            Experiences

            <h2>500</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;