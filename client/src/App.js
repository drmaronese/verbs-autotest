import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Quiz from './Quiz';
import CheckVerbs from './CheckVerbs';

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
