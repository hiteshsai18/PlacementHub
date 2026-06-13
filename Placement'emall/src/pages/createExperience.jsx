import { useState } from "react";
import API from "../services/api";

function CreateExperience() {
  const [formData, setFormData] =
    useState({
      company: "",
      candidateName: "",
      content: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await API.post(
          "/experiences",
          formData
        );

        alert(
          "Experience Added"
        );

        setFormData({
          company: "",
          candidateName: "",
          content: "",
        });

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div>
      <h1>
        Share Experience
      </h1>

      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={
            formData.company
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <input
          type="text"
          name="candidateName"
          placeholder="Your Name"
          value={
            formData.candidateName
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <textarea
          name="content"
          rows="6"
          placeholder="Interview Experience"
          value={
            formData.content
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <button
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateExperience;