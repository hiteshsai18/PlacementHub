import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Companies() {
  const [companies, setCompanies] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies =
    async () => {
      try {
        const res =
          await API.get(
            "/companies"
          );

        setCompanies(res.data);

      } catch (error) {
        console.log(error);
      }
    };

  const filteredCompanies =
    companies.filter(
      (company) => {
        const matchesSearch =
          company.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesCategory =
          category === "All" ||
          company.category ===
            category;

        return (
          matchesSearch &&
          matchesCategory
        );
      }
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

        <h1>Companies</h1>

        <input
          type="text"
          placeholder="Search Company"
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
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        >
          <option>
            All
          </option>

          <option>
            Service Based
          </option>

          <option>
            Product Based
          </option>
        </select>

        <br />
        <br />

        {filteredCompanies.map(
          (company) => (
            <div
              key={company._id}
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
                {company.name}
              </h3>

              <p>
                {
                  company.description
                }
              </p>

              <p>
                Category:
                {" "}
                {
                  company.category
                }
              </p>

              <Link
                to={`/companies/${company._id}`}
              >
                View Details
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Companies;