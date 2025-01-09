import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CheckVerbs from './CheckVerbs';
import Quiz from './Quiz';

const App = () => {
  // Render the grid of text boxes
  return (
    <div>
        <Router>
          <div align="center">
            <Link to="/">Home</Link> | <Link to="/quiz">Test quiz</Link>
          </div>
          <Routes>
            <Route path="/quiz" element={<Quiz/>} />
            <Route path="/checkverbs" element={<CheckVerbs/>} />
          </Routes>
        </Router>
    </div>
  );
};

export default App;
