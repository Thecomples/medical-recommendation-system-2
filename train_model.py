import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import pickle
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.model_selection import cross_val_score

# Load the dataset
data = pd.read_csv('data/Training.csv')
print("Total rows:", data.shape)
print("Unique rows:", data.drop_duplicates().shape)
print("Duplicate rows:\n", data[data.duplicated()])

# Remove duplicates if any
data = data.drop_duplicates()
data.to_csv('data/Training.csv', index=False)

# Introduce random noise (5% chance to flip a symptom)
np.random.seed(42)  # For reproducibility
for column in data.columns[:-1]:  # Exclude prognosis
    mask = np.random.random(len(data)) < 0.05
    data.loc[mask, column] = 1 - data.loc[mask, column]  # Flip 0 to 1 or 1 to 0

# Prepare features and target
X = data.drop('prognosis', axis=1)  # Features (all columns except prognosis)
y = data['prognosis']  # Target variable

# Split the data into training and testing sets with stratification and larger test size
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42, stratify=y)

# Train the Random Forest model with adjusted parameters
model = RandomForestClassifier(n_estimators=200, max_depth=15, random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
train_accuracy = model.score(X_train, y_train) * 100
test_accuracy = model.score(X_test, y_test) * 100
print(f"Training Accuracy: {train_accuracy:.2f}%")
print(f"Test Accuracy: {test_accuracy:.2f}%")

# Detailed performance metrics
y_pred = model.predict(X_test)
print("Classification Report:\n", classification_report(y_test, y_pred))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))

# Cross-validation with 5 folds to handle small classes
scores = cross_val_score(model, X, y, cv=5)
print("Cross-validation scores:", scores)
print("Average CV score:", scores.mean())
print("Standard deviation of CV scores:", scores.std())

# Check if the model generalizes well
if test_accuracy >= 80:
    print("Model generalizes well based on test accuracy.")
else:
    print("Model may not generalize well. Consider adjusting the model (e.g., change parameters) or collecting more data.")

# Save the model
with open('rf_model.pkl', 'wb') as f:
    pickle.dump(model, f)

print("Model saved as rf_model.pkl")
input("Press Enter to exit...")
