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
  "In the last month, how often have you felt pressured by deadlines?",
  "In the last month, how often have you felt like your workload was unmanageable?",
  "In the last month, how often have you taken breaks to de-stress?",
  "In the last month, how often have you felt lonely even when surrounded by people?",
  "In the last month, how often have you procrastinated because of stress?",
  "In the last month, how often have you felt underappreciated for your efforts?",
  "In the last month, how often have you doubted your abilities?",
  "In the last month, how often have you felt drained at the end of the day?",
  "In the last month, how often have you found it hard to focus because of stress?",
  "In the last month, how often have you noticed changes in your appetite due to stress?",
  "In the last month, how often have you avoided making decisions due to anxiety?",
  "In the last month, how often have you engaged in stress-relieving activities like exercise or meditation?",
  "In the last month, how often have you felt disconnected from people you care about?",
  "In the last month, how often have you felt like you had no control over your daily schedule?",
  "In the last month, how often have you noticed a decrease in productivity due to stress?",
  "In the last month, how often have you been able to enjoy hobbies without feeling guilty about work?",
  "In the last month, how often have you been distracted by stress when trying to relax?",
  "In the last month, how often have you felt emotionally exhausted?",
  "In the last month, how often have you struggled with self-doubt?",
  "In the last month, how often have you compared yourself to others negatively?",
  "In the last month, how often have you felt like you were falling behind in life?",
  "In the last month, how often have you experienced mood swings due to stress?",
  "In the last month, how often have you had difficulty concentrating on tasks?",
  "In the last month, how often have you felt overwhelmed by financial concerns?",
  "In the last month, how often have you sought support from friends or family when feeling stressed?",
  "In the last month, how often have you felt guilty for taking time for yourself?",
  "In the last month, how often have you wished you could escape your responsibilities?",
  "In the last month, how often have you had difficulty sleeping due to an overactive mind?",
  "In the last month, how often have you found it hard to say no to additional work or responsibilities?",
  "In the last month, how often have you felt that you were doing a good job at balancing life’s demands?",
  "In the last month, how often have you felt frustrated by things outside your control?",
  "In the last month, how often have you taken time to appreciate the positives in your life?",
  "In the last month, how often have you felt that your efforts were in vain?",
  "In the last month, how often have you worried excessively about the future?",
  "In the last month, how often have you overanalyzed past mistakes?",
  "In the last month, how often have you struggled to find motivation?",
  "In the last month, how often have you used social media as an escape from stress?",
  "In the last month, how often have you felt that your energy was drained by social interactions?",
  "In the last month, how often have you turned to unhealthy habits to cope with stress?",
  "In the last month, how often have you felt nervous before starting a new task?",
  "In the last month, how often have you been bothered by small annoyances more than usual?",
  "In the last month, how often have you felt like your efforts weren’t enough?",
  "In the last month, how often have you found yourself zoning out due to stress?",
  "In the last month, how often have you struggled with imposter syndrome?",
  "In the last month, how often have you felt like you had no time for yourself?",
  "In the last month, how often have you avoided social interactions due to stress?",
  "In the last month, how often have you worried about meeting expectations from others?",
  "In the last month, how often have you felt uncertain about your future?",
  "In the last month, how often have you wished you had better time management?",
  "In the last month, how often have you felt drained after a work or school day?",
  "In the last month, how often have you been easily irritated?",
  "In the last month, how often have you experienced tension headaches?",
  "In the last month, how often have you lost interest in things you usually enjoy?",
  "In the last month, how often have you doubted your ability to handle stress?",
  "In the last month, how often have you second-guessed your decisions?",
  "In the last month, how often have you struggled with setting boundaries?",
  "In the last month, how often have you found yourself overcommitting?",
  "In the last month, how often have you felt like your stress was affecting your relationships?",
  "In the last month, how often have you found it hard to disconnect from work or studies?",
  "In the last month, how often have you thought about making big life changes due to stress?",
  "In the last month, how often have you felt overwhelmed by the news or world events?",
  "In the last month, how often have you struggled with maintaining a positive outlook?",
  "In the last month, how often have you felt a lack of motivation to do daily tasks?",
  "In the last month, how often have you questioned your purpose or goals?",
  "In the last month, how often have you looked forward to the future with excitement?",
];

const Stress = () => {
  const [formData, setFormData] = useState({});
  const [stressLevel, setStressLevel] = useState(null);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [chatbotResponse, setChatbotResponse] = useState(""); // Store chatbot's response

  useEffect(() => {
    // Randomly select 15 distinct questions
    const shuffledQuestions = questions
      .sort(() => 0.5 - Math.random())
      .slice(0, 15);
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
      // Fetch stress level
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData
      );
      setStressLevel(response.data.stress_level);
    } catch (error) {
      console.error("Error fetching stress level:", error);
    }
  };

  useEffect(() => {
    if (stressLevel !== null) {
      fetchChatbotResponse();
    }
  }, [stressLevel]); // Automatically call chatbot API when stressLevel updates

  const fetchChatbotResponse = async () => {
    try {
      const chatbotRes = await axios.post("http://localhost:5001/chatbot", {
        query: "Provide remedies for stress relief.",
        stress_level: stressLevel, // Send stress level to API
      });
      setChatbotResponse(chatbotRes.data.response);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    }
  };

  return (
    <div className="flex items-center justify-between min-h-screen">
      {/* Left side: Questions and options */}
      <div className="w-full max-w-3xl bg-gray-50 p-8 shadow-xl flex flex-col">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Stress Level Tracker
        </h2>

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

      {/* Right side: Stress Meter and Remedies Section */}
      <div className="flex flex-col justify-center items-center w-[400px] h-full mx-36">
        {/* Stress Meter */}
        {stressLevel !== null && (
          <Progress
            classNames={{
              base: "w-[350px] drop-shadow-md mb-8",
              track: "border border-default",
              indicator: "bg-gradient-to-r from-pink-500 to-yellow-500 h-4",
              label: "tracking-wider font-medium text-default-600 text-lg",
            }}
            label="Stress Level"
            radius="lg"
            showValueLabel={true}
            size="xl"
            value={(stressLevel + 1) * 10}
          />
        )}

        {/* Remedies Section - Generated by Chatbot */}
        {stressLevel !== null && chatbotResponse && (
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg h-[450px] w-[650px] mr-12 overflow-y-auto">
            <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">
              Remedies
            </h3>
            <ul className="list-disc list-inside text-gray-700 text-md">
              {chatbotResponse
                .split("\n")
                .map((point, index) =>
                  point.trim() ? <li key={index}>{point}</li> : null
                )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stress;
