import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Header() {
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [hovered3, setHovered3] = useState(false);

  const navigate = useNavigate();

  const gotoSignIn = () => {
    console.log("clicked");
    navigate("/signin");
  };

  return (
    <header className="bg-[#9AD1D4] shadow-md">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Left Section */}
          <div className="text-gray-800 font-bold text-2xl font-poppins">
            Your Corner
          </div>
          {/* Center Section */}
          <nav className="flex-grow ml-6 pl-6">
            <ul className="flex justify-center space-x-10 text-gray-800 text-md font-medium font-poppins">
              <li>
                <motion.div
                  onHoverStart={() => setHovered1(true)}
                  onHoverEnd={() => setHovered1(false)}
                >
                  <Link
                    className="transition hover:text-white cursor-pointer"
                    to={"/"}
                  >
                    Home
                    <div
                      className={`border-t-4 border-blue-500 rounded-xl transition-all duration-300 ease-in-out ${
                        hovered1 ? "w-full" : "w-0"
                      }`}
                    ></div>
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div
                  onHoverStart={() => setHovered2(true)}
                  onHoverEnd={() => setHovered2(false)}
                >
                  <Link
                    className="transition hover:text-white"
                    to={"/resources"}
                  >
                    Resources
                    <div
                      className={`border-t-4 border-blue-500 rounded-xl transition-all duration-300 ease-in-out ${
                        hovered2 ? "w-full" : "w-0"
                      }`}
                    ></div>
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div
                  onHoverStart={() => setHovered3(true)}
                  onHoverEnd={() => setHovered3(false)}
                >
                  <Link className="transition hover:text-white" to={"/about"}>
                    About us
                    <div
                      className={`border-t-4 border-blue-500 rounded-xl transition-all duration-300 ease-in-out ${
                        hovered3 ? "w-full" : "w-0"
                      }`}
                    ></div>
                  </Link>
                </motion.div>
              </li>
            </ul>
          </nav>
          {/* Right Section */}
          <div className="flex items-center gap-6 pl-6">
            <button
              className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white shadow hover:bg-white hover:text-black font-poppins hover:scale-x-105 hover:scale-y-105 overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl"
              onClick={() => {
                gotoSignIn();
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
