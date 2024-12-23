import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchSubmitHistory from "../hooks/useFetchSubmitHistory.js";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { php } from "@codemirror/lang-php";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import TestResult from "../layout/components/TestResult.js";
import TestsContainer from "../code/TestsContainer.js";
import CodeEditor from "../code/CodeEditor.js";
import useFetchQuestion from "../hooks/useFetchQuestion.js";

const SubmitHistoryPage = () => {
  const { userId } = useParams();
  const { history, loading } = useFetchSubmitHistory(userId);
  const [openSubmissions, setOpenSubmissions] = useState([]);
  const { fetchQuestion } = useFetchQuestion();

  if (loading) return;

  const handleSubmissionClick = (submission) => {
    if (openSubmissions.some((sub) => sub.id === submission.id)) {
      setOpenSubmissions(
        openSubmissions.filter((sub) => sub.id !== submission.id)
      );
    } else {
      setOpenSubmissions([...openSubmissions, submission]);
    }
  };
  const getLanguageColor = (language) => {
    switch (language) {
      case "java":
        return "#e14a3a";
      case "javascript":
        return "#f7e018";
      case "python":
        return "#3673a5";
      case "php":
        return "#777bb3";
      default:
        return "#cccccc";
    }
  };

  return (
    <div>
      <h1>Histórico de Submissões</h1>
      <ul>
        {history.map((submission) => (
          <div key={submission.id} style={{ marginBottom: "20px" }}>
            <div
              onClick={() => handleSubmissionClick(submission)}
              style={{
                cursor: "pointer",
                padding: "10px",
                backgroundColor: "#333333",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  lineHeight: "20px",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    backgroundColor: getLanguageColor(submission.language),
                  }}
                ></div>
                <p style={{ margin: 0 }}>{submission.language}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  lineHeight: "20px",
                  color: !submission.hasErrors ? "#20d761" : "#ff516b",
                }}
              >
                <p>{!submission.hasErrors ? "✓" : "✕"}</p>
                <p>
                  {submission.testsPassed} / {submission.testsFailed}
                </p>
                <p>{submission.isSafetyCode ? "" : ""}</p>
              </div>
              <div>
                <p>{submission.questionTitle}</p>
                <p>{submission.createdAt}</p>
              </div>
            </div>
            <div style={{ padding: "20px" }}>
              {openSubmissions.some((sub) => sub.id === submission.id) && (
                <CodeEditor
                  code={submission.code}
                  setCode={() => {}}
                  language={submission.language}
                  editable={false}
                />
              )}
              {openSubmissions.some((sub) => sub.id === submission.id) && (
                <TestsContainer resultData={submission} />
              )}
            </div>
            <hr />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SubmitHistoryPage;
