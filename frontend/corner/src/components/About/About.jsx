import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CardGrid from "./CardGrid.jsx";

function About() {
  const [visible, setVisible] = useState(false);
  const [hovered1, setHovered1] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);
  return (
    <div className="hero min-h-screen pt-16 flex flex-col items-center justify-start relative">
      {/* Background Pattern with Overlay */}
      <div className="mt-0.5 text-center">
        <motion.div
          onHoverStart={() => setHovered1(true)}
          onHoverEnd={() => setHovered1(false)}
          className="inline-block"
        >
          <h1 className="text-black text-4xl font-bold font-space">About Us</h1>
          <div
            className={`border-t-4 border-blue-500 rounded-xl transition-all duration-300 ease-in-out mt-2 ${
              hovered1 ? "w-full" : "w-0"
            }`}
          ></div>
        </motion.div>
        <p
          className={`mt-4 text-black text-lg max-w-xl mx-auto text-justify font-space text-shadow transform transition-all duration-1000  ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad ipsam
          sunt quisquam molestiae provident dolores tenetur pariatur animi
          dolorum explicabo consectetur voluptatibus, deleniti esse enim nihil
          sed maiores atque accusantium. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Sed voluptatibus, voluptate incidunt quo cupiditate
          vitae mollitia alias quae quas ullam, quaerat a veritatis minima
          tempore nemo ex natus explicabo! Veritatis.
        </p>
      </div>

      <div className="mt-0.5 text-center">
        <h1 className="text-black text-4xl font-bold font-space py-8">
          Meet Our Team
        </h1>
      </div>
      <div className="py-2 my-2">
        <CardGrid />
      </div>
    </div>
  );
}

export default About;
