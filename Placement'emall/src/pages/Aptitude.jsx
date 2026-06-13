import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Aptitude() {
  const [
    questions,
    setQuestions,
  ] = useState([]);

  const [
    answers,
    setAnswers,
  ] = useState({});

  const [
    score,
    setScore,
  ] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions =
    async () => {
      try {
        const res =
          await API.get(
            "/questions"
          );

        setQuestions(
          res.data
        );

      } catch (error) {
        console.log(error);
      }
    };

  const handleSelect =
    (
      questionId,
      option
    ) => {
      setAnswers({
        ...answers,
        [questionId]:
          option,
      });
    };

  const submitTest =
async () => {
  let total = 0;

  questions.forEach(
    (question) => {
      if (
        answers[
          question._id
        ] ===
        question.answer
      ) {
        total++;
      }
    }
  );

  setScore(total);

  try {
    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    await API.post(
      "/results",
      {
        userName:
          user.name,
        score: total,
        totalQuestions:
          questions.length,
      }
    );

  } catch (error) {
    console.log(error);
  }
};

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
          Aptitude Test
        </h1>

        {questions.map(
          (
            question,
            index
          ) => (
            <div
              key={
                question._id
              }
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
                {index + 1}.
                {" "}
                {
                  question.question
                }
              </h3>

              {question.options.map(
                (
                  option
                ) => (
                  <div
                    key={
                      option
                    }
                  >
                    <input
                      type="radio"
                      name={
                        question._id
                      }
                      value={
                        option
                      }
                      onChange={() =>
                        handleSelect(
                          question._id,
                          option
                        )
                      }
                    />

                    {option}
                  </div>
                )
              )}
            </div>
          )
        )}

        <button
          onClick={
            submitTest
          }
        >
          Submit Test
        </button>

        {score !== null && (
          <h2>
            Score:
            {" "}
            {score}
            {" / "}
            {
              questions.length
            }
          </h2>
        )}
      </div>
    </div>
  );
}

export default Aptitude;