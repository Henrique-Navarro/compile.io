import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchQuestion from "../hooks/useFetchQuestion";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import ResizablePanel from "../layout/components/ResizablePanel";

const Question = () => {
  const { questionId } = useParams();
  const [leftWidth, setLeftWidth] = useState(45);

  const { question, loading, error } = useFetchQuestion(questionId);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <LeftPanel question={question} width={leftWidth} />
      <ResizablePanel leftWidth={leftWidth} setLeftWidth={setLeftWidth} />
      <RightPanel question={question} width={100 - leftWidth} />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#1f202a",
    color: "white",
  },
};

export default Question;
