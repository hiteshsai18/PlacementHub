import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Companies() {
  const [companies, setCompanies] =
    useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies =
    async () => {
      const res =
        await API.get(
          "/companies"
        );

      setCompanies(res.data);
    };

  return (
    <div>
      <h1>Companies</h1>

      {companies.map((company) => (
        <div key={company._id}>
          <h3>
            <Link
              to={`/companies/${company._id}`}
            >
              {company.name}
            </Link>
          </h3>
        </div>
      ))}
    </div>
  );
}

export default Companies;