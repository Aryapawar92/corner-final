import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const [hovered1, setHovered1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onSignUp = async (event) => {
    event.preventDefault();
    setError("");

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
        }
      );
      console.log(response.data);
      navigate("/signin");
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during signup"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E0F7FA]">
      <div className="bg-white w-full max-w-[1000px] h-[600px] rounded-lg shadow-lg flex overflow-hidden">
        <div className="flex flex-col justify-center w-full sm:w-1/2 px-8 bg-white">
          <form className="w-full" onSubmit={onSignUp}>
            <h2 className="text-3xl font-bold text-center text-black pb-4 font-space">
              Create Account
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:space-x-4 pb-4">
              <div className="flex flex-col w-full">
                <label className="text-sm font-semibold text-black font-space">
                  First Name
                </label>
                <input
                  className="border border-gray-300 p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={user.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm font-semibold text-black font-space">
                  Last Name
                </label>
                <input
                  className="border border-gray-300 p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={user.lastName}
                  onChange={handleChange}
                  required
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
                name="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col pb-4">
              <label className="text-sm font-semibold text-black font-space">
                Password
              </label>
              <input
                className="border border-gray-300 p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={user.password}
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>

            <div className="flex flex-col pb-4">
              <label className="text-sm font-semibold text-black font-space">
                Confirm Password
              </label>
              <input
                className="border border-gray-300 p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={user.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#1976D2] hover:bg-[#0D47A1] text-white font-semibold font-space rounded-lg shadow-md transition duration-300 ease-in-out disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>

            <motion.div
              onHoverStart={() => setHovered1(true)}
              onHoverEnd={() => setHovered1(false)}
            >
              <div className="flex justify-between mt-4 text-sm text-gray-600 font-space">
                <p>Already have an account?</p>
                <div className="relative">
                  <Link
                    to="/signin"
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
