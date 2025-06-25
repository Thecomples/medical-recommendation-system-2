import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SymptomForm from './SymptomForm';
import DiseaseDetails from './DiseaseDetails';
import './App.css';

const App = () => {
  const [prediction, setPrediction] = useState(null);

  const handlePredict = (data) => {
    setPrediction(data);
  };

  return (
    <Router>
      <div className="App">
        <h1>Medical Recommendation System</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SymptomForm onPredict={handlePredict} />
                <DiseaseDetails prediction={prediction} />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;