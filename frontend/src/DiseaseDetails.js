import React from 'react';
import './App.css';

const DiseaseDetails = ({ prediction }) => {
  if (!prediction) return null;

  return (
    <div className="prediction-container">
      <h2>Prediction Results</h2>
      <p><strong>Disease:</strong> {prediction.disease}</p>
      <p><strong>Probability:</strong> {(prediction.probability * 100).toFixed(2)}%</p>
      <p><strong>Description:</strong> {prediction.description}</p>
      <h3>Precautions:</h3>
      <ul>
        {prediction.precautions.map((precaution, index) => (
          <li key={index}>{precaution}</li>
        ))}
      </ul>
      <h3>Diet Recommendations:</h3>
      <ul>
        {prediction.diet.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h3>Workout Recommendations:</h3>
      <ul>
        {prediction.workout.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default DiseaseDetails;