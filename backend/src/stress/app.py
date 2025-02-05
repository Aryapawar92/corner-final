from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)

# Allow CORS for frontend connection (localhost:5173 for Vite)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
  
@app.route("/predict", methods=["POST"])
def predict_stress():
    data = request.json
    print(data)
    stress_score = 0
    questions = len(data.keys())
    print(f"questions: {questions}")
    try:
        for key, value in data.items():
            stress_score += int(value)
    except:
        return jsonify({"error": "Invalid input"}), 400
    stress_percent = (stress_score / (questions*4)) * 100
    if stress_percent < 33:
        stress_level = 0
    elif stress_percent < 67:
        stress_level = 1
    else:
        stress_level = 2
    print(stress_level)
    return jsonify({"stress_level": int(stress_level), "stress_percent": stress_percent, "stress_score": stress_score})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
