# Medical Recommendation System

Symptom-based disease prediction and lifestyle recommendations.

Users select symptoms (with optional severity). A trained machine learning model predicts a likely condition and returns a short description plus precaution, diet, and workout suggestions.

> Disclaimer: This is an educational / portfolio project. It is not a medical diagnosis tool and must not replace a doctor, pharmacist, or emergency care.

## Features

- Predict a condition from selected symptoms
- Return confidence score plus description, precautions, diet, and workout tips
- React frontend (`frontend/`) with symptom checklist and severity sliders
- Random Forest training pipeline (`train_model.py`)
- Saved models: `rf_model.pkl`, `svc.pkl`, `model.onnx`
- Quick CLI prediction script (`predict.py`)

## Tech stack

- Frontend: React 18, Axios, React Router
- Backend (expected): Flask, Flask-CORS
- ML: scikit-learn (Random Forest, SVC), pandas, NumPy
- Export: ONNX / skl2onnx

The React app calls:

- `GET http://localhost:5000/api/symptoms`
- `POST http://localhost:5000/api/predict`

Request body:

```json
{
  "symptoms": ["itching", "skin_rash"],
  "severities": { "itching": 3, "skin_rash": 2 }
}
