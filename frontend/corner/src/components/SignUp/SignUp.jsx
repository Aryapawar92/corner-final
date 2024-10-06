import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  const [hovered1, setHovered1] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E0F7FA]">
      {/* Main Box Section */}
      <div className="bg-white w-full max-w-[1000px] h-[600px] rounded-lg shadow-lg flex overflow-hidden">
        {/* Left Side - Form Section */}
        <div className="flex flex-col justify-center w-full sm:w-1/2 px-8 bg-white">
          <form className="w-full">
            <h2 className="text-3xl font-bold text-center text-black pb-4 font-space">
              Create Account
            </h2>

            <div className="flex flex-col sm:flex-row sm:space-x-4 pb-4">
              <div className="flex flex-col w-full">
                <label className="text-sm font-semibold text-black font-space">
                  First Name
                </label>
                <input
                  className="border border-gray-300 p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  type="text"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm font-semibold text-black font-space">
                  Last Name
                </label>
                <input
                  className="border border-gray-300 p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  type="text"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="flex flex-col pb-4">
              <label className="text-sm font-semibold text-black font-space">
                Email
              </label>
              <input
                className="border border-gray-300 p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="flex flex-col pb-4">
              <label className="text-sm font-semibold text-black font-space">
                Password
              </label>
              <input
                className="border border-gray-300 p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex flex-col pb-4">
              <label className="text-sm font-semibold text-black font-space">
                Confirm Password
              </label>
              <input
                className="border border-gray-300 p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                type="password"
                placeholder="Confirm your password"
              />
            </div>

            <button className="w-full py-3 bg-[#1976D2] hover:bg-[#0D47A1] text-white font-semibold font-space rounded-lg shadow-md transition duration-300 ease-in-out">
              Sign Up
            </button>

            <motion.div
              onHoverStart={() => setHovered1(true)}
              onHoverEnd={() => setHovered1(false)}
            >
              <div className="flex justify-between mt-4 text-sm text-gray-600 font-space">
                <p>Already have an account?</p>
                <div className="relative">
                  <Link
                    to={"/signin"}
                    className="text-black hover:text-indigo-700"
                  >
                    Sign In
                  </Link>
                  <div
                    className={`absolute left-0 bottom-0 h-1 rounded-xl bg-blue-500 transition-all duration-300 ease-in-out ${
                      hovered1 ? "w-full" : "w-0"
                    }`}
                  ></div>
                </div>
              </div>
            </motion.div>
          </form>
        </div>

        {/* Right Side - Image Section */}
        <div className="hidden sm:block w-1/2 h-full">
          <img
            src="src/assets/mental-2-cover.jpg"
            className="w-full h-full object-cover"
            alt="Mental Sign Up"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
