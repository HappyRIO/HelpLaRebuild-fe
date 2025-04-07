import React, { useState, useEffect } from "react";

const Thinking: React.FC = () => {
  const [dots, setDots] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) {
          return "";
        }
        return prevDots + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-2 py-4 text-[#847733] animate-pulse">
      <div className="w-4 h-4 rounded-full bg-[#847733] animate-bounce"></div>
      <span className="text-2xl font-bold  max-md:text-xl">Scanning the  Help LA Rebuild Database{dots}</span>
    </div>
  );
};

export default Thinking;
