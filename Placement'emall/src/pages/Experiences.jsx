import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Experiences() {
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

        <h1>Interview Experiences</h1>
      </div>
    </div>
  );
}

export default Experiences;