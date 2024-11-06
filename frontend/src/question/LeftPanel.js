import React from 'react';
import QuestionContent from './QuestionContent';

const LeftPanel = ({ question, width }) => {
  return (
    <div style={{ width: `${width}%`, padding: '20px', overflowY: 'auto' }}>
      <QuestionContent question={question} />
    </div>
  );
};

export default LeftPanel;
