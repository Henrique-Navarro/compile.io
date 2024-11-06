import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionList from './questionList/QuestionList';
import Question from './question/Question';
import NavBar from './layout/components/NavBar';
import { ThemeProvider } from './layout/theme/ThemeProvider';


const App = () => {

  return (
    <ThemeProvider>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<QuestionList />} />
        
        <Route path="/questions/getAll" element={<QuestionList />} />
        
        <Route path="/questions/get/:questionId" element={<Question />} />
        
      </Routes>
    </Router>
    </ThemeProvider>
  );
};

export default App;
