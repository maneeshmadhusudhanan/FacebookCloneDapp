import React from 'react';
import { motion } from 'framer-motion';

function Right() {
  // Define animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full bg-gray-100 p-4 rounded-md shadow-md">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <input
          type="text"
          placeholder="Search Blockchain"
          className="w-full p-2 rounded-full border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </motion.div>
      
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg font-bold mb-4"
      >
        What's happening
      </motion.h2>

      {/* Blockchain Content in Card Style */}
      {[
        {
          title: "Ethereum 2.0 Launch",
          description: "The upgrade promises to bring improved scalability and security.",
          icon: "🚀🔗",
        },
        {
          title: "DeFi Explodes",
          description: "Decentralized Finance (DeFi) market crosses $100 billion in value.",
          icon: "💰📈",
        },
        {
          title: "Bitcoin ETF Approved",
          description: "First Bitcoin Exchange-Traded Fund (ETF) gets approval, opening the market to institutional investors.",
          icon: "🏛️📊",
        },
        {
          title: "NFTs Continue to Boom",
          description: "Non-Fungible Tokens (NFTs) redefine digital ownership in the art world.",
          icon: "🎨💎",
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          className="mb-6 bg-white p-4 rounded-lg shadow-md"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          <p className="text-gray-700">
            <span className="font-bold">{item.title}</span> {item.icon}
          </p>
          <p className="text-sm text-gray-500">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default Right;
