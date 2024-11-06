import React from 'react';
import CodeSubmission from '../code/CodeSubmission';

const RightPanel = ({ question, width }) => {
  return (
    <div style={{ width: `${width}%`, padding: '20px', overflowY: 'auto' }}>
      <CodeSubmission question={question}/>
    </div>
  );
};

export default RightPanel;
