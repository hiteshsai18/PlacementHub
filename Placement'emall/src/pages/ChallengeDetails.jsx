import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

import Editor from "@monaco-editor/react";

function ChallengeDetails() {
  const { id } = useParams();

  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState("");
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const [languageId, setLanguageId] = useState(63);
  const [editorLanguage, setEditorLanguage] = useState("javascript");

  useEffect(() => {
    fetchChallenge();
  }, []);

  const fetchChallenge = async () => {
    try {
      const res = await API.get(`/challenges/${id}`);

      setChallenge(res.data);
      setCode(res.data.starterCode || "");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLanguageChange = (e) => {
    const value = Number(e.target.value);

    setLanguageId(value);

    switch (value) {
      case 63:
        setEditorLanguage("javascript");
        break;

      case 71:
        setEditorLanguage("python");
        break;

      case 62:
        setEditorLanguage("java");
        break;

      case 54:
        setEditorLanguage("cpp");
        break;

      default:
        setEditorLanguage("javascript");
    }
  };

  const runCode = async () => {
    setLoading(true);

    try {
      const res = await API.post("/judge/run", {
        source_code: code,
        language_id: languageId,
        stdin,
      });

      let result = "";

      if (res.data.stdout) {
        result += res.data.stdout;
      }

      if (res.data.stderr) {
        result += "\n" + res.data.stderr;
      }

      if (res.data.compile_output) {
        result += "\n" + res.data.compile_output;
      }

      if (!result) {
        result = "No Output";
      }

      result += `

Execution Time : ${res.data.time || "N/A"} sec

Memory : ${res.data.memory || "N/A"} KB`;

      setOutput(result);

    } catch (error) {
      setOutput(
        error.response?.data?.message ||
          "Execution Failed"
      );
    }

    setLoading(false);
  };

  const submitSolution = async () => {
    try {
      await API.post("/submissions", {
        challengeId: challenge._id,
        code,
        status: "Solved",
      });

      alert("Solution Submitted Successfully");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Submission Failed"
      );
    }
  };

  if (!challenge) {
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
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

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

        <h1>{challenge.title}</h1>

        <h3>Difficulty: {challenge.difficulty}</h3>

        <p>{challenge.description}</p>

        <hr />

        <h3>Sample Input</h3>

        <pre>{challenge.sampleInput}</pre>

        <h3>Sample Output</h3>

        <pre>{challenge.sampleOutput}</pre>

        <h3>Constraints</h3>

        <pre>{challenge.constraints}</pre>

        <h3>Explanation</h3>

        <pre>{challenge.explanation}</pre>

        <hr />

        <h3>Language</h3>

        <select
          value={languageId}
          onChange={handleLanguageChange}
        >
          <option value={63}>
            JavaScript (Node.js)
          </option>

          <option value={71}>
            Python
          </option>

          <option value={62}>
            Java
          </option>

          <option value={54}>
            C++
          </option>
        </select>

        <br />
        <br />

        <Editor
          height="500px"
          language={editorLanguage}
          theme="vs-dark"
          value={code}
          onChange={(value) =>
            setCode(value || "")
          }
          options={{
            fontSize: 16,
            minimap: {
              enabled: false,
            },
            automaticLayout: true,
            tabSize: 4,
            insertSpaces: true,
            wordWrap: "on",
            scrollBeyondLastLine: false,
            formatOnPaste: true,
            formatOnType: true,
          }}
        />

        <br />

        <h3>Custom Input</h3>

        <textarea
          rows="5"
          style={{
            width: "100%",
            padding: "10px",
          }}
          placeholder="Enter custom input..."
          value={stdin}
          onChange={(e) =>
            setStdin(e.target.value)
          }
        />

        <br />
        <br />

        <button
          onClick={runCode}
          disabled={loading}
        >
          {loading
            ? "Running..."
            : "Run Code"}
        </button>

        {"  "}

        <button
          onClick={submitSolution}
        >
          Submit Solution
        </button>

        <hr />

        <h2>Output</h2>

        <pre
          style={{
            background: "#111",
            color: "#00ff66",
            padding: "15px",
            borderRadius: "8px",
            minHeight: "150px",
            overflowX: "auto",
          }}
        >
          {output}
        </pre>
      </div>
    </div>
  );
}

export default ChallengeDetails;