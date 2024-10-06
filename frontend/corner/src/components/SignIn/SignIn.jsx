import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function SignIn() {
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);

  //const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E0F7FA]">
      {/* Main Box Section */}
      <div className="bg-white w-full max-w-[1000px] h-[500px] rounded-lg shadow-lg flex overflow-hidden">
        {/* Left Side - Image Section */}
        <div className="hidden sm:block w-1/2 h-full">
          <img
            src="src/assets/mental-2-cover.jpg"
            className="w-full h-full object-cover"
            alt="Mental Signin"
          />
        </div>

        {/* Right Side - Form Section */}
        <div className="flex flex-col justify-center w-full sm:w-1/2 px-8 bg-white">
          <form className="w-full">
            <h2 className="text-3xl font-bold text-center text-black pb-4 font-space">
              Welcome Back
            </h2>

            <div className="flex flex-col pb-4">
              <label className="text-sm font-semibold text-black font-space">
                Username
              </label>
              <input
                className="border border-gray-300 p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                type="text"
                placeholder="Enter your username"
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

            <div className="flex justify-between items-center pb-4">
              <label className="flex items-center">
                <input className="mr-2 accent-indigo-600" type="checkbox" />
                <span className="text-sm text-gray-600 font-space">
                  Remember Me
                </span>
              </label>
              <motion.div
                onHoverStart={() => setHovered1(true)}
                onHoverEnd={() => setHovered1(false)}
              >
                <Link
                  href="#"
                  className="text-sm text-black  hover:text-indigo-700 font-space"
                >
                  Forgot Password?
                </Link>
                <div
                  className={`border-t-4 border-blue-500 rounded-xl transition-all duration-300 ease-in-out ${
                    hovered1 ? "w-full" : "w-0"
                  }`}
                ></div>
              </motion.div>
            </div>

            <button className="w-full py-3 bg-[#1976D2] hover:bg-[#0D47A1] text-white font-semibold font-space rounded-lg shadow-md transition duration-300 ease-in-out">
              Sign In
            </button>
            <motion.div
              onHoverStart={() => setHovered2(true)}
              onHoverEnd={() => setHovered2(false)}
            >
              <div className="flex justify-between mt-4 text-sm text-gray-600 font-space">
                <p>Don’t have an account?</p>
                <div className="relative">
                  <Link
                    to={"/signup"}
                    className="text-black hover:text-indigo-700"
                  >
                    Create an account
                  </Link>
                  <div
                    className={`absolute left-0 bottom-0 h-1 rounded-xl bg-blue-500 transition-all duration-300 ease-in-out ${
                      hovered2 ? "w-full" : "w-0"
                    }`}
                  ></div>
                </div>
              </div>
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
