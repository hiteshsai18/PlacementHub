import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#1e293b",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>Placement Hub</h2>

      <hr />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <Link to="/dashboard" style={{ color: "white" }}>
          Dashboard
        </Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/aptitude" style={{ color: "white" }}>
          Aptitude
        </Link>
        <Link to="/challenges">Coding Challenges</Link>

        <Link to="/submissions">My Submissions</Link>

        <Link to="/results">Results</Link>
        <Link to="/companies" style={{ color: "white" }}>
          Companies
        </Link>

        <Link to="/experiences" style={{ color: "white" }}>
          Interview Experiences
        </Link>

        <Link to="/profile" style={{ color: "white" }}>
          Profile
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
