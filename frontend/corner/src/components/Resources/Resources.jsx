"use client";
import React from "react";
import { motion } from "framer-motion";
import { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";

function Resources() {
  //const handleMouseMove: MouseEventHandler = (event) => {

  //}

  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="grid col-span-1 sm:grid-cols-2 md:grid-cols-3 gap-14">
        <motion.div
          whileHover={{ scale: 1.05 }}
          //onMouseMove={handleMouseMove}
          className="flex flex-col h-120 w-96 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-400 p-4 shadow-lg overflow-hidden group"
        >
          <CardContent
            imageUrl="../src/assets/stress1.jpg"
            header="Stress Tracker"
            to={() => navigate("/resources/stress")}
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col h-120 w-96 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-400 p-4 shadow-lg overflow-hidden group"
        >
          <CardContent
            imageUrl="../src/assets/chatbot.jpg"
            header="Ai ChatBot"
            to={() => navigate("/resources/chatbot")}
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col h-120 w-96 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-400 p-4 shadow-lg overflow-hidden group"
        >
          <CardContent
            imageUrl="../src/assets/dep.jpg"
            header="Depression Tracker"
            to={() => navigate("/resources/depression")}
          />
        </motion.div>
      </div>
    </main>
  );
}

const CardContent = ({ imageUrl, header, to }) => {
  return (
    <>
      <div className="relative w-full aspect-square rounded-md overflow-hidden">
        <img src={imageUrl} alt="Profile Picture" fill />
      </div>

      <div className="flex flex-col gap-0 mt-4">
        <h1 className="text-xl pb-8 font-semibold tracking-tight leading-tight text-center font-redhat">
          {header}
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={to}
          className="inline-block rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-8 mx-32 text-sm w-min items-center font-space"
        >
          Try Here
        </motion.button>
      </div>
      <div className="mt-auto flex justify-between items-center"></div>
    </>
  );
};

export default Resources;
