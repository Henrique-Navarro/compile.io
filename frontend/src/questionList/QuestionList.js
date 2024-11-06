import React from 'react';
import { Link } from 'react-router-dom';
import useFetchQuestions from '../hooks/useFetchQuestions';
import './styles.css';

const QuestionsList = () => {
  const { questions, loading, error } = useFetchQuestions();

  if (loading) {
    return <div>Loading...</div>;
  }

  const getLevelStyle = (level) => {
    if (!level) return 'hard';
    return level.toLowerCase();
  };

  return (
    <div className="main-container">
      {questions.map((question) => (
        <div key={question.id} className="question-box">
          <div className="question-header">
            <div className="question-info">
              <h1>{question.title}</h1>
              <p>
                <span className={`difficulty ${getLevelStyle(question.level)}`}>
                  {question.level || 'Hard'},
                </span> 
                <span>
                  Max Score: {question.maxScore}, Success Rate: {question.successRate}%
                </span>
              </p>
              <p className="description">{question.description}</p>
            </div>
            <div className="actions">
              <span className="icon">⭐</span>
              <Link to={`/questions/get/${question.id}`}>
                <button className="solve-button">Solve Challenge</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionsList;
