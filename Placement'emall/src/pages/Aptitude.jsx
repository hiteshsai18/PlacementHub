import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

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

  const [
    category,
    setCategory,
  ] = useState(
    "Quantitative"
  );

  const [
    difficulty,
    setDifficulty,
  ] = useState("Easy");

  const [
    timeLeft,
    setTimeLeft,
  ] = useState(600);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (
      timeLeft <= 0
    ) {
      submitTest();
      return;
    }

    const timer =
      setInterval(() => {
        setTimeLeft(
          (prev) =>
            prev - 1
        );
      }, 1000);

    return () =>
      clearInterval(timer);
  }, [timeLeft]);

  const fetchQuestions =
    async () => {
      try {
        const res =
          await API.get(
            `/questions?category=${category}&difficulty=${difficulty}`
          );

        setQuestions(
          res.data
        );

      } catch (error) {
        console.log(error);
      }
    };

  const handleAnswer =
    (
      questionId,
      answer
    ) => {
      setAnswers({
        ...answers,
        [questionId]:
          answer,
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
        await API.post(
          "/results",
          {
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
        padding: "20px",
      }}
    >
      <h1>
        Aptitude Test
      </h1>

      <h2>
        Time Left:
        {" "}
        {
          Math.floor(
            timeLeft /
              60
          )
        }
        :
        {String(
          timeLeft %
            60
        ).padStart(
          2,
          "0"
        )}
      </h2>

      <select
        value={category}
        onChange={(e) =>
          setCategory(
            e.target.value
          )
        }
      >
        <option>
          Quantitative
        </option>

        <option>
          Reasoning
        </option>

        <option>
          Verbal
        </option>
      </select>

      <select
        value={
          difficulty
        }
        onChange={(e) =>
          setDifficulty(
            e.target.value
          )
        }
      >
        <option>
          Easy
        </option>

        <option>
          Medium
        </option>

        <option>
          Hard
        </option>
      </select>

      <button
        onClick={
          fetchQuestions
        }
      >
        Start Test
      </button>

      <hr />

      {questions.map(
        (question) => (
          <div
            key={
              question._id
            }
          >
            <h3>
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
                      handleAnswer(
                        question._id,
                        option
                      )
                    }
                  />

                  {option}
                </div>
              )
            )}

            <br />
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
          {score}/
          {
            questions.length
          }
        </h2>
      )}
    </div>
  );
}

export default Aptitude;