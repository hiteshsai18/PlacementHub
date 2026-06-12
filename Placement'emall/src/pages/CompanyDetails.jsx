import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import API from "../services/api";

function CompanyDetails() {
  const { id } = useParams();

  const [company, setCompany] =
    useState(null);

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany =
    async () => {
      const res =
        await API.get(
          `/companies/${id}`
        );

      setCompany(res.data);
    };

  if (!company)
    return <h2>Loading...</h2>;

  return (
    <div>
      <h1>
        {company.name}
      </h1>

      <p>
        {company.description}
      </p>

      <h3>
        Hiring Process
      </h3>

      <ul>
        {company.hiringProcess.map(
          (item, index) => (
            <li key={index}>
              {item}
            </li>
          )
        )}
      </ul>

      <h3>
        Interview Pattern
      </h3>

      <ul>
        {company.interviewPattern.map(
          (item, index) => (
            <li key={index}>
              {item}
            </li>
          )
        )}
      </ul>

      <h3>
        Preparation Tips
      </h3>

      <ul>
        {company.preparationTips.map(
          (item, index) => (
            <li key={index}>
              {item}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default CompanyDetails;