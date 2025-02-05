import React, { useState, useEffect } from "react";
import axios from "axios";
import { Progress } from "@heroui/react";

const questions = [
  "In the last month, how often have you been upset because of something that happened unexpectedly?",
  "In the last month, how often have you felt that you were unable to control the important things in your life?",
  "In the last month, how often have you felt nervous and stressed?",
  "In the last month, how often have you felt confident about your ability to handle your personal problems?",
  "In the last month, how often have you felt that things were going your way?",
  "In the last month, how often have you found that you could not cope with all the things that you had to do?",
  "In the last month, how often have you been able to control irritations in your life?",
  "In the last month, how often have you felt overwhelmed by responsibilities?",
  "In the last month, how often have you felt that you were on top of things?",
  "In the last month, how often have you been angry because of minor inconveniences?",
  "In the last month, how often have you felt that you had little control over the direction of your life?",
  "In the last month, how often have you been satisfied with your achievements?",
  "In the last month, how often have you been disappointed in yourself?",
  "In the last month, how often have you felt like you lacked support from others?",
  "In the last month, how often have you been able to relax and let go of your worries?",
  "In the last month, how often have you been discouraged about the future?",
  "In the last month, how often have you felt a sense of purpose in your daily activities?",
  "In the last month, how often have you felt that others were demanding too much from you?",
  "In the last month, how often have you had difficulty sleeping because of worries?",
  "In the last month, how often have you felt happy and content?",
  "In the last month, how often have you felt confident in making decisions?",
  "In the last month, how often have you experienced physical symptoms (like headaches or fatigue) due to stress?",
  "In the last month, how often have you felt like you were able to balance work and personal life?",
  "In the last month, how often have you felt that your time was well spent?",
  "In the last month, how often have you found yourself avoiding situations that made you uncomfortable?",
];

const Stress = () => {
  const [formData, setFormData] = useState({});
  const [stressLevel, setStressLevel] = useState(null);
  const [randomQuestions, setRandomQuestions] = useState([]);

  useEffect(() => {
    // Randomly select 10 distinct questions
    const shuffledQuestions = questions
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
    setRandomQuestions(shuffledQuestions);

    // Initialize formData for selected questions
    const initialData = {};
    shuffledQuestions.forEach((q) => (initialData[q] = 0));
    setFormData(initialData);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData
      );
      setStressLevel(response.data.stress_level);
    } catch (error) {
      console.error("Error fetching stress level:", error);
    }
  };

  const stressColors = ["#00ff00", "#ffcc00", "#ff0000"];
  const stressLabels = ["Low", "Medium", "Chronic"];

  return (
    <div className="flex items-center justify-between min-h-screen ">
      {/* Left side: Questions and options */}
      <div className="w-full max-w-3xl bg-gray-50 p-8  shadow-xl flex flex-col">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Stress Level Tracker
        </h2>

        {/* Scrollable container for questions */}
        <div
          className="overflow-y-auto flex-grow"
          style={{ maxHeight: "550px" }}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {randomQuestions.map((q, index) => (
              <div key={q} className="mb-4">
                <label className="block text-gray-700 font-medium mb-2 text-left">
                  {index + 1}. {q}
                </label>
                <div className="flex flex-col space-y-2">
                  {[0, 1, 2, 3, 4].map((value) => (
                    <div key={value} className="flex items-center">
                      <input
                        type="radio"
                        id={`${q}_${value}`}
                        name={q}
                        value={value}
                        onChange={handleChange}
                        checked={formData[q] === value}
                        className="mr-2"
                      />
                      <label
                        htmlFor={`${q}_${value}`}
                        className="text-sm text-gray-600"
                      >
                        {
                          [
                            "Never",
                            "Almost Never",
                            "Sometimes",
                            "Fairly Often",
                            "Often",
                          ][value]
                        }
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </form>
        </div>

        <button
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-200 mt-4"
          type="submit"
          onClick={handleSubmit}
        >
          Check Stress Level
        </button>
      </div>

      {/* Right side: Circular Progress Bar */}
      <div className="flex justify-center items-center w-[200px] h-full mx-36 ">
        {stressLevel !== null && (
          <Progress
            classNames={{
              base: "w-[300px] drop-shadow-md",
              track: "border border-default",
              indicator: "bg-gradient-to-r from-pink-500 to-yellow-500 h-4",
              label: "tracking-wider font-medium text-default-600 text-lg",
            }}
            label="Stress Level"
            radius="lg"
            showValueLabel={true}
            size="xl"
            value={(stressLevel + 1) * 33.3}
          />
        )}
      </div>
    </div>
  );
};

export default Stress;
