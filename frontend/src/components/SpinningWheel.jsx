import React, { useState } from "react";
import { motion } from "framer-motion";

function SpinningWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [message, setMessage] = useState(null);

  // Hardcoded outcomes for the spinning wheel
  const outcomes = [
    "🎉 10 Tokens!",
    "🎁 20 Tokens!",
    "⭐ Better luck next time!",
    "🏆 50 Tokens!",
    "🎈 5 Tokens!",
  ];

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setMessage(null);

    // Simulate spinning and landing on a random outcome
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * outcomes.length);
      const result = outcomes[randomIndex];

      setMessage(`Result: ${result}`);
      setIsSpinning(false);
    }, 3000); // 3-second spin duration
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md text-center">
      <h3 className="text-lg font-bold mb-4">Spin the Wheel 🎡</h3>
      <div className="relative w-40 h-40 mx-auto mb-4">
        <motion.div
          className="absolute w-full h-full rounded-full border-4 border-blue-500"
          animate={{
            rotate: isSpinning ? 3600 : 0,
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage:
              "conic-gradient(#FFA500 20%, #FFD700 40%, #ADFF2F 60%, #FF69B4 80%, #87CEEB 100%)",
          }}
        ></motion.div>
        <div className="absolute w-6 h-6 bg-red-500 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
      </div>
      <button
        onClick={spinWheel}
        className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-all duration-300"
        disabled={isSpinning}
      >
        {isSpinning ? "Spinning..." : "Spin"}
      </button>
      {message && (
        <div className={`mt-4 font-bold ${message.includes("Better luck") ? "text-red-500" : "text-green-500"}`}>
          {message}
        </div>
      )}
    </div>
  );
}

export default SpinningWheel;
