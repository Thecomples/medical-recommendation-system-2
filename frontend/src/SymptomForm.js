import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const SymptomForm = ({ onPredict }) => {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [severities, setSeverities] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/symptoms')
      .then(response => setSymptoms(response.data))
      .catch(error => console.error('Error fetching symptoms:', error));
  }, []);

  const handleSymptomChange = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSeverityChange = (symptom, value) => {
    setSeverities(prev => ({ ...prev, [symptom]: parseInt(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/predict', { symptoms: selectedSymptoms, severities })
      .then(response => onPredict(response.data))
      .catch(error => console.error('Error predicting:', error));
  };

  return (
    <div className="form-container">
      <h2>Select Symptoms</h2>
      <form onSubmit={handleSubmit}>
        <div className="symptom-list">
          {symptoms.map(symptom => (
            <div key={symptom} className="symptom-item">
              <label>
                <input
                  type="checkbox"
                  value={symptom}
                  onChange={() => handleSymptomChange(symptom)}
                />
                {symptom.replace(/_/g, ' ')}
              </label>
              {selectedSymptoms.includes(symptom) && (
                <select
                  onChange={(e) => handleSeverityChange(symptom, e.target.value)}
                  value={severities[symptom] || 1}
                >
                  {[1, 2, 3, 4, 5, 6, 7].map(val => (
                    <option key={val} value={val}>Severity {val}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
        <button type="submit" disabled={selectedSymptoms.length === 0}>
          Predict Disease
        </button>
      </form>
    </div>
  );
};

export default SymptomForm;