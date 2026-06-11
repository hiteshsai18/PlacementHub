function Dashboard() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>
        Welcome {user?.name}
      </h2>
      </div>
  );
}

export default Dashboard;