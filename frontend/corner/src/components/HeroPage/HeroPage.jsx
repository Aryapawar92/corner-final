import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HeroPage() {
  const navigate = useNavigate();
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [transitionClasses, setTransitionClasses] = useState("");

  const handleScroll = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      const { top } = featuresSection.getBoundingClientRect();
      // Check if the features section is in view
      if (top <= window.innerHeight && !featuresVisible) {
        setFeaturesVisible(true); // Trigger animation when in view
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [featuresVisible]);

  useEffect(() => {
    setTransitionClasses("translate-x-0 opacity-100 duration-1000 ease-in-out");
  });

  const gotoSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-custom-dark-blue overflow-hidden">
      <div className="hero min-h-screen flex flex-col justify-center items-center relative">
        {/* Content */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left Side: Text Content */}
          <div
            className={`lg:w-1/2 text-center lg:text-left ${
              transitionClasses
                ? transitionClasses
                : "-translate-x-full opacity-0"
            }`}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4 font-space">
              Take Charge of Your Mental Well-Being
            </h1>
            <p className="text-lg sm:text-xl text-black mb-8 font-space">
              Access personalized tools to help <br /> you feel your best,
              anytime.
            </p>
            <div className="flex justify-center lg:justify-start text-white gap-4">
              <button
                type="button"
                className="inline-flex items-center rounded-md px-5 py-3 text-sm font-semibold hover:bg-white hover:text-black bg-black text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black font-space hover:scale-x-105 hover:scale-y-105 overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl"
              >
                Learn More
              </button>
              <button
                type="button"
                onClick={gotoSignup}
                className="inline-flex items-center rounded-md px-5 py-3 text-sm font-semibold hover:bg-white hover:text-black bg-black text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black font-space hover:scale-x-105 hover:scale-y-105 overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
            <img
              src="src/assets/signin-cover-2.jpg"
              className={`max-w-full lg:max-w-md rounded-lg shadow-2xl ${
                transitionClasses
                  ? transitionClasses
                  : "translate-x-full opacity-0"
              }`}
              alt="Hero"
            />
          </div>
        </div>
      </div>

      {/* Meet our Team */}
      <div className="mt-0.5 text-center bg-white">
        <h1 className="text-black text-4xl font-bold font-space py-8">
          Our Key Features
        </h1>
      </div>

      {/* Bento Grid */}
      <div
        id="features"
        className={`flex bg-white justify-center gap-4 p-6 container mx-auto py-10 transition-opacity duration-1000 ${
          featuresVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <section className="grid grid-cols-3 gap-4 font-space">
          <div
            className="p-6 border text-xl border-indigo-600 bg-black text-white rounded-[12px] flex flex-col gap-1 col-span-1 row-span-2"
            style={{ height: "550px", width: "450px" }}
          >
            <span>Stress</span>
            <span>Tracker</span>

            {/* Phone Container */}
            <div className="flex justify-center items-center mt-4 border border-black ml-16 mr-16">
              <div
                className={`w-56 h-96 bg-white rounded-3xl shadow-lg relative overflow-hidden hover:scale-105 transition duration-300 ease-in-out`}
              >
                {/* Notch for the front camera */}
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black rounded-full"
                  style={{ marginTop: "10px" }}
                ></div>

                {/* Screen */}
                <div className="w-full h-full rounded-3xl bg-white flex flex-col items-center justify-center p-4">
                  <h2 className="text-2xl font-bold justify-center items-center p-6 ml-2 text-black">
                    Track Your Stress Here
                  </h2>
                  <button className="bg-black text-white font-bold py-2 px-4 rounded-3xl hover:bg-white hover:text-black hover:scale-105 transition duration-300 ease-in-out">
                    Click Here
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="p-6 border text-lg border-indigo-600 bg-black text-white rounded-[12px] flex flex-col gap-1 col-span-1 row-span-1"
            style={{ height: "265px", width: "450px" }}
          >
            <span>Progress</span>
            <span>Report</span>

            <div
              className="radial-progress hover:scale-105 transition duration-300 ease-in-out"
              style={{
                "--value": "70",
                "--size": "8rem",
                "--thickness": "1rem",
              }}
              role="progressbar"
            >
              70%
            </div>
            <div>
              <p className="text-md font-space lg:text-right px-2 ">
                Check Your Progress
              </p>
            </div>
          </div>
          <div
            className="p-6 border text-xl border-indigo-600 bg-black text-white rounded-[12px] flex flex-col gap-1 col-span-1 row-span-2"
            style={{ height: "550px", width: "450px" }}
          >
            <span>Powerful</span>
            <span>Chatbot</span>
            <img
              src="src/assets/chatbot.jpg"
              className="w-full h-[350px] overflow-hidden transition duration-300 ease-in-out hover:scale-105"
            />
            <p className="text-md">
              Engage with our powerful chatbot for instant support and
              personalized mental health resources, 24/7.
            </p>
          </div>
          <div
            className="p-6 border border-indigo-600 bg-black text-white rounded-[12px] flex flex-col gap-1 col-span-1 row-span-1 text-lg"
            style={{ height: "265px", width: "450px" }}
          >
            <span>Secure Data</span>
            <p className="text-sm">Encrypted and Anonymous Data</p>
            <div className="mockup-code m-2 hover:scale-105 transition duration-300 ease-in-out">
              <pre data-prefix="$">
                <code>encrypt data</code>
              </pre>
              <pre data-prefix=">" className="text-warning">
                <code>processing...</code>
              </pre>
              <pre data-prefix=">" className="text-success">
                <code>Done!</code>
              </pre>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-0.5 text-center">
        <h1 className="text-black text-4xl font-bold font-space py-8">
          Our Daily Posts
        </h1>
      </div>

      <div className="flex w-full justify-center py-11 gap-8">
        <div className="rounded-2xl w-[400px] overflow-hidden hover:scale-105 transition duration-300 ease-in-out">
          <img
            src="src/assets/signin-cover-2.jpg"
            className="w-[400px] h-[300px]"
          />
          <div className="p-6 text-lg ">
            <h1 className="font-extrabold text-gray-800 font-space">
              Blog Topic
            </h1>
            <p className="text-gray-600 text-sm font-space my-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
              obcaecati doloribus sint, velit ducimus corporis, tenetur quae,
              corrupti quas explicabo laborum eum! Dignissimos ullam, libero
              amet vero earum voluptate nobis molestias accusamus expedita dicta
              iusto odio vel maiores, nostrum quis exercitationem rerum minima
              et excepturi? Dignissimos distinctio ullam ducimus! Et?
            </p>
            <button className="bg-black hover:bg-white text-white hover:text-black font-semibold py-2 px-4 font-space rounded-xl">
              Read More
            </button>
          </div>
        </div>
        <div className="rounded-2xl w-[400px] overflow-hidden hover:scale-105 transition duration-300 ease-in-out">
          <img
            src="src/assets/signin-cover-2.jpg"
            className="w-[400px] h-[300px]"
          />
          <div className="p-6 text-lg hover: transition duration-300 ease-in-out hover:bg-white">
            <h1 className="font-extrabold text-gray-800 font-space">
              Blog Topic
            </h1>
            <p className="text-gray-600 text-sm font-space my-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
              obcaecati doloribus sint, velit ducimus corporis, tenetur quae,
              corrupti quas explicabo laborum eum! Dignissimos ullam, libero
              amet vero earum voluptate nobis molestias accusamus expedita dicta
              iusto odio vel maiores, nostrum quis exercitationem rerum minima
              et excepturi? Dignissimos distinctio ullam ducimus! Et?
            </p>
            <button className="bg-black hover:bg-white text-white hover:text-black font-semibold py-2 px-4 font-space rounded-xl">
              Read More
            </button>
          </div>
        </div>
        <div className="rounded-2xl w-[400px] overflow-hidden hover:scale-105 transition duration-300 ease-in-out">
          <img
            src="src/assets/signin-cover-2.jpg"
            className="w-[400px] h-[300px]"
          />
          <div className="p-6 text-lg hover: transition duration-300 ease-in-out hover:bg-white">
            <h1 className="font-extrabold text-gray-800 font-space">
              Blog Topic
            </h1>
            <p className="text-gray-600 text-sm font-space my-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
              obcaecati doloribus sint, velit ducimus corporis, tenetur quae,
              corrupti quas explicabo laborum eum! Dignissimos ullam, libero
              amet vero earum voluptate nobis molestias accusamus expedita dicta
              iusto odio vel maiores, nostrum quis exercitationem rerum minima
              et excepturi? Dignissimos distinctio ullam ducimus! Et?
            </p>
            <button className="bg-black hover:bg-white text-white hover:text-black font-semibold py-2 px-4 font-space rounded-xl">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroPage;
