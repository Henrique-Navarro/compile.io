import React, { useState, useEffect } from "react";

const ResizablePanel = ({ leftWidth, setLeftWidth }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newWidth = (e.clientX / window.innerWidth) * 100;
      setLeftWidth(Math.min(Math.max(newWidth, 20), 80));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return <div style={styles.separator} onMouseDown={handleMouseDown} />;
};

const styles = {
  separator: {
    cursor: "ew-resize",
    width: "10px",
    backgroundColor: "black",
    height: "100%",
  },
};

export default ResizablePanel;
