import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const Filter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    status: { solved: false, unsolved: true },
    difficulty: { initial: false, intermediate: false, advanced: false },
    category: {
      POO: false,
      STRING: false,
      MATH: false,
      ARRAY: false,
      LOOPS: false,
      OPERATIONS: false,
      CONDITIONS: false,
      CONVERSIONS: false,
      NUMBERS: false,
    },
    points: { five: false, ten: false, fifteen: false },
  });

  const handleCheckboxChange = (group, key) => {
    const updatedFilters = {
      ...filters,
      [group]: {
        ...filters[group],
        [key]: !filters[group][key],
      },
    };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      status: { solved: false, unsolved: true },
      difficulty: { initial: false, intermediate: false, advanced: false },
      category: {
        POO: false,
        STRING: false,
        MATH: false,
        ARRAY: false,
        LOOPS: false,
        OPERATIONS: false,
        CONDITIONS: false,
        CONVERSIONS: false,
        NUMBERS: false,
      },
      points: { five: false, ten: false, fifteen: false },
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div style={filterContainer}>
      <div style={filterBox}>
        <h3 style={titleStyle}>Filters</h3>
        <div style={sectionStyle}>
          <button style={resetButtonStyle} onClick={resetFilters}>
            <FaTimes />
            Clear Filters
          </button>
          <p>Status</p>
          {["solved", "unsolved"].map((status) => (
            <label key={status} style={labelStyle}>
              <input
                type="checkbox"
                checked={filters.status[status]}
                onChange={() => handleCheckboxChange("status", status)}
                style={hiddenCheckbox}
              />
              <span style={customCheckbox}>
                {filters.status[status] && <span style={checkmark}></span>}
              </span>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </label>
          ))}
        </div>

        <div style={sectionStyle}>
          <p>Difficulty</p>
          {["initial", "intermediate", "advanced"].map((level) => (
            <label key={level} style={labelStyle}>
              <input
                type="checkbox"
                checked={filters.difficulty[level]}
                onChange={() => handleCheckboxChange("difficulty", level)}
                style={hiddenCheckbox}
              />
              <span style={customCheckbox}>
                {filters.difficulty[level] && <span style={checkmark}></span>}
              </span>
              {level}
            </label>
          ))}
        </div>

        <div style={sectionStyle}>
          <p>Category</p>
          {Object.keys(filters.category).map((category) => (
            <label key={category} style={labelStyle}>
              <input
                type="checkbox"
                checked={filters.category[category]}
                onChange={() => handleCheckboxChange("category", category)}
                style={hiddenCheckbox}
              />
              <span style={customCheckbox}>
                {filters.category[category] && <span style={checkmark}></span>}
              </span>
              {category}
            </label>
          ))}
        </div>

        <div style={sectionStyle}>
          <p>Points</p>
          {["five", "ten", "fifteen"].map((point) => (
            <label key={point} style={labelStyle}>
              <input
                type="checkbox"
                checked={filters.points[point]}
                onChange={() => handleCheckboxChange("points", point)}
                style={hiddenCheckbox}
              />
              <span style={customCheckbox}>
                {filters.points[point] && <span style={checkmark}></span>}
              </span>
              {point === "five" ? 5 : point === "ten" ? 10 : 15}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

// Estilos
const filterContainer = {
  position: "sticky",
  top: "10px",
  alignSelf: "start", // Mantém o filtro alinhado ao topo
};

const filterBox = {
  width: "300px",
  backgroundColor: "#2a2e38",
  padding: "1.5rem",
  borderRadius: "8px",
  color: "#f7fafc",
};

const titleStyle = {
  fontSize: "1.5rem",
  marginBottom: "1rem",
  borderBottom: "1px solid #444",
};

const sectionStyle = {
  marginBottom: "1.5rem",
};

const labelStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "0.5rem",
  cursor: "pointer",
};

const hiddenCheckbox = {
  position: "absolute",
  opacity: 0,
  pointerEvents: "none",
};

const customCheckbox = {
  width: "20px",
  height: "20px",
  border: "2px solid #444",
  borderRadius: "4px",
  marginRight: "0.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#2a2e38",
  cursor: "pointer",
};

const checkmark = {
  width: "10px",
  height: "10px",
  backgroundColor: "#4caf50",
  borderRadius: "2px",
};

const resetButtonStyle = {
  padding: "0.5rem 1rem",
  backgroundColor: "#e53e3e",
  color: "#fff",
  fontWeight: "600",
  borderRadius: "0.25rem",
  border: "none",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

export default Filter;
