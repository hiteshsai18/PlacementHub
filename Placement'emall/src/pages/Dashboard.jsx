import Navbar from "../components/Navbar";

function Dashboard() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <>
      <Navbar />

      <div>
        <h1>Dashboard</h1>

        <h2>
          Welcome {user?.name}
        </h2>

        <p>
          Email: {user?.email}
        </p>
      </div>
    </>
  );
}

export default Dashboard;