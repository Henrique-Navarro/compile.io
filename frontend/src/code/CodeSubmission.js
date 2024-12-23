import React, { useState, useEffect } from "react";
import useRunCode from "../hooks/useRunCode";
import useSubmitCode from "../hooks/useSubmitCode";
import { useParams } from "react-router-dom";
import CodeEditor from "./CodeEditor";
import Output from "./Output";
import TestsContainer from "./TestsContainer";
import Button from "../layout/components/Button";
import Select from "../layout/components/Select";
import { FaRedo } from "react-icons/fa"; // Importando o ícone de reset

const CodeSubmission = ({ question }) => {
  const [code, setCode] = useState("");
  const [baseCodes, setBaseCodes] = useState([]);
  const { runCode, setOutput, output } = useRunCode();
  const { submitCode, setCorrection, correction } = useSubmitCode();
  const [language, setLanguage] = useState("");
  const [isRunLoading, setIsRunLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const { questionId } = useParams();
  const userId = 1;

  /** Dados retornados pelo backend (Output e Correction) */
  useEffect(() => {
    if (output) {
      setIsRunLoading(false);
      setCorrection(null); // Limpa a correção quando um novo output é recebido
    }
  }, [output]);

  useEffect(() => {
    if (correction) {
      setIsSubmitLoading(false);
      setOutput(null); // Limpa o output quando uma nova correção é recebida
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

  /** Atualiza o código quando a linguagem é alterada */
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    const selectedCodeBase = baseCodes.find(
      (baseCode) => baseCode.language === selectedLanguage
    );
    setCode(selectedCodeBase ? selectedCodeBase.code : "");
  };

  /** Função para resetar o código */
  const handleReset = () => {
    const selectedCodeBase = baseCodes.find(
      (baseCode) => baseCode.language === language
    );
    setCode(selectedCodeBase ? selectedCodeBase.code : "");
  };

  /** Enviar para o backend */
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

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
