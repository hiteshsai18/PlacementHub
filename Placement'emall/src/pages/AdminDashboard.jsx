import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";

function AdminDashboard() {
  const [stats, setStats] =
    useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats =
    async () => {
      try {
        const res =
          await API.get(
            "/admin/dashboard"
          );

        setStats(res.data);

      } catch (error) {
        console.log(error);

        alert(
          error.response?.data?.message ||
            "Access Denied"
        );
      }
    };

  if (!stats) {
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

          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

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
          Admin Dashboard
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(2,1fr)",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <Card
            title="Users"
            value={stats.users}
          />

          <Card
            title="Companies"
            value={stats.companies}
          />

          <Card
            title="Challenges"
            value={stats.challenges}
          />

          <Card
            title="Questions"
            value={stats.questions}
          />

          <Card
            title="Experiences"
            value={stats.experiences}
          />
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
}) {
  return (
    <div
      style={{
        border:
          "1px solid #ddd",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h2>{title}</h2>

      <h1>{value}</h1>
    </div>
  );
}

export default AdminDashboard;