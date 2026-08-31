# Medical Recommendation System

Symptom-based disease prediction and lifestyle recommendations.

Users select symptoms (with optional severity). A trained machine learning model predicts a likely condition and returns a short description plus precaution, diet, and workout suggestions.

> **Disclaimer:** This is an educational / portfolio project. It is **not** a medical diagnosis tool and must not replace a doctor, pharmacist, or emergency care.

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

{
  "symptoms": ["itching", "skin_rash"],
  "severities": { "itching": 3, "skin_rash": 2 }
}

Expected response:

{
  "disease": "Fungal infection",
  "probability": 0.92,
  "description": "...",
  "precautions": ["...", "..."],
  "diet": ["...", "..."],
  "workout": ["...", "..."]
}

## Repository layout

medical-recommendation-system-2/
├── frontend/
│   └── src/
│       ├── App.js
│       ├── SymptomForm.js
│       └── DiseaseDetails.js
├── train_model.py
├── predict.py
├── rf_model.pkl
├── svc.pkl
├── model.onnx
├── requirements.txt
└── .gitignore

Training data is expected at `data/Training.csv` (symptom columns + `prognosis` target). That folder is not in the repo yet.

## Setup

### Clone

git clone https://github.com/Thecomples/medical-recommendation-system-2.git
cd medical-recommendation-system-2

### Python

python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

### Train the model

python train_model.py

This loads `data/Training.csv`, drops duplicates, adds light symptom noise, trains a Random Forest (`n_estimators=200`, `max_depth=15`), prints metrics, and saves `rf_model.pkl`.

### Command-line prediction

python predict.py

This loads `svc.pkl` and uses a 132-length binary symptom vector. Replace the placeholder `sample_data` list with real 0/1 values in the same order as `Training.csv`.

### Frontend

cd frontend
npm install
npm start

The UI runs at `http://localhost:3000` and expects the Flask API on port `5000`.

## How it works

1. Each symptom is a binary feature (`0` or `1`).
2. The classifier maps that vector to a disease label (`prognosis`).
3. The frontend can also send a severity score from 1 to 7 for each selected symptom.
4. After prediction, the UI shows description, precautions, diet, and workout recommendations.

## Known gaps

- The Flask API (`/api/symptoms`, `/api/predict`) is used by the frontend but the server file is not in this repo yet.
- `data/Training.csv` and lookup tables (description, precautions, diet, workout) are not committed.


## Medical safety

Do not use this app for real diagnosis or treatment. Always consult a qualified clinician.
