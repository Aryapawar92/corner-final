import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";

function CardGrid() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetch("/src/components/About/members.json")
      .then((response) => response.json())
      .then((data) => setTeamMembers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="min-h-screen p-4 bg-custom-dark-blue">
      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-10">
        {/* Render Cards */}
        {teamMembers.map((member) => (
          <Card key={member.id} item={member} />
        ))}
      </div>
    </div>
  );
}

export default CardGrid;
