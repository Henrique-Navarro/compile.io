import React, { useState, useEffect } from "react";
import useRunCode from "../hooks/useRunCode";
import useSubmitCode from "../hooks/useSubmitCode";
import { useParams } from "react-router-dom";
import CodeEditor from "./CodeEditor";
import Output from "./Output";
import TestsContainer from "./TestsContainer";
import Button from "../layout/components/Button";
import Select from "../layout/components/Select";
import { FaRedo, FaLightbulb, FaRegLightbulb } from "react-icons/fa"; // Importando ícones
import Confetti from "react-confetti";

const CodeSubmission = ({ question }) => {
  const [code, setCode] = useState("");
  const [baseCodes, setBaseCodes] = useState([]);
  const { runCode, setOutput, output } = useRunCode();
  const { submitCode, setCorrection, correction } = useSubmitCode();
  const [language, setLanguage] = useState("");
  const [isRunLoading, setIsRunLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // Estado para confetes
  const [showHint, setShowHint] = useState(false); // Estado para mostrar a dica
  const [hintVisible, setHintVisible] = useState(false); // Estado para controlar a visibilidade com clique
  const [isLampOn, setIsLampOn] = useState(false); // Estado para controlar o estado da lâmpada

  const { questionId } = useParams();
  const userId = 1;

  useEffect(() => {
    if (output) {
      setIsRunLoading(false);
      setCorrection(null);
    }
  }, [output]);

  useEffect(() => {
    if (correction) {
      setIsSubmitLoading(false);
      setOutput(null);

      if (!correction.hasErrors) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000); // Mostra os confetes por 5 segundos
      }
    }
  }, [correction]);

  useEffect(() => {
    if (question) {
      setBaseCodes(question.baseCodes);
      if (question.baseCodes.length > 0) {
        setLanguage(question.baseCodes[0].language);
        setCode(question.baseCodes[0].code);
      }
    }
  }, [question]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    const selectedCodeBase = baseCodes.find(
      (baseCode) => baseCode.language === selectedLanguage
    );
    setCode(selectedCodeBase ? selectedCodeBase.code : "");
  };

  const handleReset = () => {
    const selectedCodeBase = baseCodes.find(
      (baseCode) => baseCode.language === language
    );
    setCode(selectedCodeBase ? selectedCodeBase.code : "");
  };

  const handleRun = () => {
    setIsRunLoading(true);
    setOutput(null);
    setCorrection(null);
    const codeDTO = { code, language, questionId, userId };
    runCode(codeDTO);
  };

  const handleSubmit = () => {
    setIsSubmitLoading(true);
    setOutput(null);
    setCorrection(null);
    const codeDTO = { code, language, questionId, userId };
    submitCode(codeDTO);
  };

  const handleIconClick = () => {
    setHintVisible(!hintVisible);
    setIsLampOn(!isLampOn);
  };

  const handleMouseEnter = () => {
    setIsLampOn(true);
    setShowHint(true);
  };

  const handleMouseLeave = () => {
    if (!hintVisible) {
      setIsLampOn(false);
      setShowHint(false);
    }
  };

  return (
    <>
      {showConfetti && <Confetti />} {/* Componente de confetes */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative" }}>
          {/* Exibe o botão de dica apenas se houver erro na correção */}
          {correction && correction.hasErrors && (
            <div
              style={{
                position: "fixed",
                top: "48px",
                left: "47%",
                transform: "translateX(-50%)",
                width: "200px",
                backgroundColor: "black",
                borderRadius: "5px",
                display: showHint || hintVisible ? "block" : "none",
                padding: "10px",
                color: "white",
                fontSize: "14px",
                textAlign: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <strong>DICA:</strong> {question.hint}
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "0",
                  height: "0",
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                  borderTop: "10px solid black",
                }}
              ></div>
            </div>
          )}

          {/* Ícone de Dica */}
          {correction && correction.hasErrors && (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleIconClick}
              style={{
                cursor: "pointer",
                marginRight: "15px",
                position: "relative",
                zIndex: 1,
              }}
            >
              {isLampOn ? (
                <FaLightbulb size={20} color="#f7f06d" />
              ) : (
                <FaRegLightbulb size={20} color="white" />
              )}
            </div>
          )}
        </div>

        <Select
          language={language}
          handleLanguageChange={handleLanguageChange}
        />
        <button
          onClick={handleReset}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          <FaRedo size={20} color="white" />
        </button>
      </div>
      <CodeEditor
        code={code}
        setCode={setCode}
        language={language}
        setLanguage={setLanguage}
      />
      <br />
      <div style={buttonContainer}>
        <Button
          onClick={handleRun}
          isLoading={isRunLoading}
          value="Run"
          backgroundColor="#3182ce"
        />
        <Button
          onClick={handleSubmit}
          isLoading={isSubmitLoading}
          value="Submit"
          backgroundColor="#48bb78"
        />
      </div>
      <Output output={output} inputExample={question.inputExample} />
      <TestsContainer resultData={correction} />
    </>
  );
};

const buttonContainer = {
  display: "flex",
  justifyContent: "space-between",
};

export default CodeSubmission;
