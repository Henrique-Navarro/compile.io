import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchSubmitHistory from "../hooks/useFetchSubmitHistory.js";
import CodeEditor from "../code/CodeEditor.js";
import TestsContainer from "../code/TestsContainer.js";
import { FaChevronDown } from "react-icons/fa";
import { Container } from "react-bootstrap";

const SubmitHistory = () => {
  const { userId } = useParams();
  const { history, loading } = useFetchSubmitHistory(userId);
  const [visibleSubmissions, setVisibleSubmissions] = useState([]);
  const [filters, setFilters] = useState({
    language: "",
    status: "",
    date: "",
  });

  if (loading) return <></>;

  const toggleVisibility = (submissionId) => {
    if (visibleSubmissions.includes(submissionId)) {
      setVisibleSubmissions(
        visibleSubmissions.filter((id) => id !== submissionId)
      );
    } else {
      setVisibleSubmissions([...visibleSubmissions, submissionId]);
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

  const formatDate = (dateString) => {
    const [datePart, timePart] = dateString.split(" ");
    const [day, month, year] = datePart.split(":");

    const formattedDateString = `${year}-${month}-${day}T${timePart}`;

    const date = new Date(formattedDateString);

    if (isNaN(date)) {
      return "Invalid date";
    }

    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    return date.toLocaleDateString("pt-BR", options);
  };

  const getUniqueSubmissionsByLanguage = (submissions) => {
    const languages = ["php", "python", "javascript"];
    const uniqueSubmissions = [];

    languages.forEach((language) => {
      const submission = submissions.find(
        (sub) => sub.language.toLowerCase() === language
      );
      if (submission) {
        uniqueSubmissions.push(submission);
      }
    });

    return uniqueSubmissions;
  };

  // Filtrando as submissões com base nos filtros selecionados
  const filteredHistory = getUniqueSubmissionsByLanguage(
    history.filter((submission) => {
      const languageMatch = filters.language
        ? submission.language === filters.language
        : true;
      const statusMatch = filters.status
        ? filters.status === "passed"
          ? !submission.hasErrors
          : submission.hasErrors
        : true;
      const dateMatch = filters.date
        ? submission.createdAt.includes(filters.date)
        : true;

      return languageMatch && statusMatch && dateMatch;
    })
  );

  // Filtrando as submissões com base nos filtros selecionados

  const styles = {
    box: {
      backgroundColor: "rgb(32,36,44)",
      borderRadius: "0.75rem",
      padding: "1rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      color: "#e2e8f0",
      marginBottom: "2rem",
      maxWidth: "1500px",
      fontFamily: "'Open Sans', 'Roboto', sans-serif",
      fontWeight: "100",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      paddingBottom: "0.5rem",
      borderBottom: "1px solid #444",
    },
    center: {
      textAlign: "center",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    toggleIcon: {
      fontSize: "1.5rem",
      transition: "transform 0.3s ease",
    },
    content: {
      marginTop: "1rem",
      overflow: "hidden",
      transition: "height 0.3s ease",
    },
    expandedContent: {
      border: "1px solid #444",
      borderRadius: "0.5rem",
      padding: "1rem",
      backgroundColor: "#2a2a3b",
    },
    container: {
      maxWidth: "1060px",
      margin: "0 auto",
      padding: "1.5rem",
      color: "#f7fafc",
    },
    infoSection: {
      marginTop: "0.5rem",
      color: "#cbd5e0",
      fontSize: "0.9rem",
    },
    status: {
      margin: "0.5rem 0",
      fontSize: "1rem",
      fontWeight: "bold",
    },
    passed: {
      color: "#20d761",
    },
    failed: {
      color: "#ff516b",
    },
    tests: {
      margin: "0.5rem 0",
      fontSize: "0.9rem",
    },
    date: {
      marginTop: "0.5rem",
      color: "#888",
      fontSize: "0.85rem",
    },
    filterSection: {
      display: "flex",
      justifyContent: "center",
      gap: "3rem",
      backgroundColor: "#2a2a3b",
      padding: "1rem",
      borderRadius: "5px",
    },
    filterSelect: {
      padding: "0.5rem",
      borderRadius: "5px",
      backgroundColor: "#1f202a",
      color: "#e2e8f0",
      border: "1px solid #444",
    },
  };

  return (
    <>
      <div style={styles.filterSection}>
        <select
          style={styles.filterSelect}
          value={filters.language}
          onChange={(e) => setFilters({ ...filters, language: e.target.value })}
        >
          <option value="">All Languages</option>
          <option value="java">Java</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="php">PHP</option>
        </select>
        <select
          style={styles.filterSelect}
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Submissions</option>
          <option value="passed">Passed</option>
          <option value="failed">Failed</option>
        </select>
        <input
          style={styles.filterSelect}
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
      </div>
      <Container style={styles.container}>
        <h1 style={styles.center}>Histórico de submissões</h1>
        {filteredHistory.map((submission) => (
          <div key={submission.id} style={styles.box}>
            <div
              style={styles.header}
              onClick={() => toggleVisibility(submission.id)}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
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
                  <p
                    style={{ margin: 0, fontWeight: "bold", color: "#f7fafc" }}
                  >
                    {submission.language.toUpperCase()}
                  </p>
                </div>
                <p style={{ margin: "0.5rem 0", color: "#e2e8f0" }}>
                  {submission.questionTitle}
                </p>
              </div>
              <p
                style={{
                  ...styles.status,
                  color: submission.hasErrors ? "#ff516b" : "#20d761",
                }}
              >
                {submission.hasErrors ? "✕ Failed" : "✓ Passed"}
              </p>
              <p style={styles.tests}>
                <span
                  style={submission.hasErrors ? styles.failed : styles.passed}
                >
                  {submission.testsPassed}/{submission.testsFailed} tests
                </span>
              </p>

              <p style={styles.date}>{formatDate(submission.createdAt)}</p>

              <FaChevronDown
                style={{
                  ...styles.toggleIcon,
                  transform: visibleSubmissions.includes(submission.id)
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              />
            </div>
            <div
              style={{
                ...styles.content,
                height: visibleSubmissions.includes(submission.id)
                  ? "auto"
                  : "0",
              }}
            >
              {visibleSubmissions.includes(submission.id) && (
                <div style={styles.expandedContent}>
                  <CodeEditor
                    code={submission.code}
                    setCode={() => {}}
                    language={submission.language}
                    editable={false}
                    height="250px"
                  />
                  <TestsContainer resultData={submission} scroll={true} />
                </div>
              )}
            </div>
          </div>
        ))}
      </Container>
    </>
  );
};

export default SubmitHistory;
