from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Allow CORS for frontend connection (localhost:5173 for Vite)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route("/predict", methods=["POST"])
def predict_stress():
    data = request.json
    print(data)

    stress_score = 0
    questions = len(data.keys())

    print(f"Questions: {questions}")

    try:
        for key, value in data.items():
            stress_score += int(value)
    except:
        return jsonify({"error": "Invalid input"}), 400

    # Calculate stress percentage
    stress_percent = (stress_score / (questions * 4)) * 100

    # Assign stress levels based on percentage
    if stress_percent <= 10:
        stress_level = 0  # No Stress
    elif stress_percent <= 30:
        stress_level = 1  # Very Mild Stress
    elif stress_percent <= 50:
        stress_level = 2  # Mild Stress
    elif stress_percent <= 65:
        stress_level = 3  # Moderate Stress
    elif stress_percent <= 85:
        stress_level = 4  # High Stress
    else:
        stress_level = 5  # Severe Stress

    print(f"Stress Level: {stress_level}")

    return jsonify({
        "stress_level": int(stress_level),
        "stress_percent": round(stress_percent, 2),
        "stress_score": stress_score
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)
