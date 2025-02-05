import React, { useState, useEffect } from "react";
import axios from "axios";
import { Progress } from "@heroui/react";

const questions = [
  {
    text: "Sadness",
    options: [
      "I do not feel sad",
      "I feel sad much of the time",
      "I am sad all the time",
      "I am so sad or unhappy that I can't stand it",
    ],
  },
  {
    text: "Pessimism",
    options: [
      "I am not discouraged about my future",
      "I feel more discouraged about my future than I used to be",
      "I do not expect things to work out for me",
      "I feel my future is hopeless and will only get worse",
    ],
  },
  {
    text: "Past Failure",
    options: [
      "I do not feel like a failure",
      "I have failed more than I should have",
      "As I look back, I see a lot of failures",
      "I feel I am a total failure as a person",
    ],
  },
  {
    text: "Loss of Pleasure",
    options: [
      "I get as much pleasure as I ever did from the things I enjoy",
      "I don't enjoy things as much as I used to",
      "I get very little pleasure from the things I used to enjoy",
      "I can't get any pleasure from the things I used to enjoy",
    ],
  },
  {
    text: "Guilty Feelings",
    options: [
      "I don't feel particularly guilty",
      "I feel guilty over many things I have done or should have done",
      "I feel quite guilty most of the time",
      "I feel guilty all of the time",
    ],
  },
  {
    text: "Punishment Feelings",
    options: [
      "I don't feel I am being punished",
      "I feel I may be punished",
      "I expect to be punished",
      "I feel I am being punished",
    ],
  },
  {
    text: "Self-Dislike",
    options: [
      "I feel the same about myself as ever",
      "I have lost confidence in myself",
      "I am disappointed in myself",
      "I dislike myself",
    ],
  },
  {
    text: "Self-Criticalness",
    options: [
      "I don't criticize or blame myself more than usual",
      "I am more critical of myself than I used to be",
      "I criticize myself for all of my faults",
      "I blame myself for everything bad that happens",
    ],
  },
  {
    text: "Suicidal Thoughts or Wishes",
    options: [
      "I don't have any thoughts of killing myself",
      "I have thoughts of killing myself, but I would not carry them out",
      "I would like to kill myself",
      "I would kill myself if I had the chance",
    ],
  },
  {
    text: "Crying",
    options: [
      "I don't cry any more than I used to",
      "I cry more than I used to",
      "I cry over every little thing",
      "I feel like crying, but I can't",
    ],
  },
  {
    text: "Agitation",
    options: [
      "I am no more restless or wound up than usual",
      "I feel more restless or wound up than usual",
      "I am so restless or agitated that it's hard to stay still",
      "I am so restless or agitated that I have to keep moving or doing something",
    ],
  },
  {
    text: "Loss of Interest",
    options: [
      "I have not lost interest in other people or activities",
      "I am less interested in other people or things than before",
      "I have lost most of my interest in other people or things",
      "It's hard to get interested in anything",
    ],
  },
  {
    text: "Indecisiveness",
    options: [
      "I make decisions about as well as ever",
      "I find it more difficult to make decisions than usual",
      "I have much greater difficulty in making decisions than I used to",
      "I have trouble making any decisions",
    ],
  },
  {
    text: "Worthlessness",
    options: [
      "I do not feel I am worthless",
      "I don't consider myself as worthwhile and useful as I used to",
      "I feel more worthless as compared to other people",
      "I feel utterly worthless",
    ],
  },
  {
    text: "Loss of Energy",
    options: [
      "I have as much energy as ever",
      "I have less energy than I used to have",
      "I don't have enough energy to do very much",
      "I don't have enough energy to do anything",
    ],
  },
  {
    text: "Changes in Sleeping Pattern",
    options: [
      "I have not experienced any change in my sleeping pattern",
      "I sleep somewhat more than usual",
      "I sleep somewhat less than usual",
      "I sleep a lot more than usual",
      "I sleep a lot less than usual",
      "I sleep most of the day",
      "I wake up 1-2 hours early and can't get back to sleep",
    ],
  },
  {
    text: "Irritability",
    options: [
      "I am no more irritable than usual",
      "I am more irritable than usual",
      "I am much more irritable than usual",
      "I am irritable all the time",
    ],
  },
  {
    text: "Changes in Appetite",
    options: [
      "I have not experienced any change in my appetite",
      "My appetite is somewhat less than usual",
      "My appetite is somewhat greater than usual",
      "My appetite is much less than before",
      "My appetite is much greater than usual",
      "I have no appetite at all",
      "I crave food all the time",
    ],
  },
  {
    text: "Concentration Difficulty",
    options: [
      "I can concentrate as well as ever",
      "I can't concentrate as well as usual",
      "It's hard to keep my mind on anything for very long",
      "I find I can't concentrate on anything",
    ],
  },
  {
    text: "Tiredness or Fatigue",
    options: [
      "I am no more tired or fatigued than usual",
      "I get more tired or fatigued more easily than usual",
      "I am too tired or fatigued to do a lot of the things I used to do",
      "I am too tired or fatigued to do most of the things I used to do",
    ],
  },
  {
    text: "Loss of Interest in Sex",
    options: [
      "I have not noticed any recent change in my interest in sex",
      "I am less interested in sex than I used to be",
      "I am much less interested in sex now",
      "I have lost interest in sex completely",
    ],
  },
];

const Depression = () => {
  const [formData, setFormData] = useState({});
  const [stressLevel, setStressLevel] = useState(null);
  const [randomQuestions, setRandomQuestions] = useState([]);

  useEffect(() => {
    // Select all questions
    setRandomQuestions(questions);

    // Initialize formData for selected questions
    const initialData = {};
    questions.forEach((q) => (initialData[q.text] = 0));
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

  return (
    <div className="flex items-center justify-between min-h-screen">
      {/* Left side: Questions and options */}
      <div className="w-full max-w-3xl bg-gray-50 p-8 shadow-xl flex flex-col">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Depression Level Tracker
        </h2>

        {/* Scrollable container for questions */}
        <div
          className="overflow-y-auto flex-grow"
          style={{ maxHeight: "550px" }}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {randomQuestions.length > 0 ? (
              randomQuestions.map((questionObj, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2 text-left">
                    {index + 1}. {questionObj.text}
                  </label>
                  <div className="flex flex-col space-y-2">
                    {questionObj.options.map((option, value) => (
                      <div key={value} className="flex items-center">
                        <input
                          type="radio"
                          id={`${index}_${value}`}
                          name={questionObj.text}
                          value={value}
                          onChange={handleChange}
                          checked={formData[questionObj.text] === value}
                          className="mr-2"
                        />
                        <label
                          htmlFor={`${index}_${value}`}
                          className="text-sm text-gray-600"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>Loading questions...</p>
            )}
          </form>
        </div>

        <button
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-200 mt-4"
          type="submit"
          onClick={handleSubmit}
        >
          Check Depression Level
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
            label="Depression Level"
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

export default Depression;
