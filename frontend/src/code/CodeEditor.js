import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { php } from "@codemirror/lang-php";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import {
  autocomplete,
  closeBrackets,
  closeBraces,
} from "@codemirror/autocomplete";

const CodeEditor = ({ code, setCode, language, editable = true }) => {
  const handleCodeChange = (value) => {
    setCode(value);
  };

  const getLanguageExtension = () => {
    switch (language) {
      case "php":
        return php();
      case "python":
        return python();
      case "java":
        return java();
      default:
        return javascript();
    }
  };

  return (
    <div>
      <CodeMirror
        value={code}
        height="400px"
        extensions={[getLanguageExtension(), EditorView.lineWrapping]}
        onChange={handleCodeChange}
        theme={oneDark}
        editable={editable}
        style={{ border: "1px solid #ddd", borderRadius: "5px" }}
      />
    </div>
  );
};

export default CodeEditor;
