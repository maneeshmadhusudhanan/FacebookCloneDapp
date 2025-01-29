import React from "react";
import { FaComment, FaRetweet, FaHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

function ExploreEthereum() {
  // Dummy data for Ethereum and Web3 posts
  const posts = [
    {
      id: 1,
      username: "Ethereum",
      handle: "@ethereum",
      date: "Jan 5, 2025",
      text: "Ethereum's Shanghai upgrade is set to make staking withdrawals possible. Here's everything you need to know!",
      image:
        "https://via.placeholder.com/800x400?text=Ethereum+Shanghai+Upgrade",
      link: "https://ethereum.org/en/upgrades/shanghai/",
      comments: 12,
      retweets: 74,
      likes: 150,
    },
    {
      id: 2,
      username: "Vitalik Buterin",
      handle: "@VitalikButerin",
      date: "Dec 15, 2024",
      text: "Layer 2 scaling solutions are the key to Ethereum's mass adoption. Explore how ZK-rollups are revolutionizing scalability!",
      image:
        "https://via.placeholder.com/800x400?text=Layer+2+Scaling",
      link: "https://vitalik.ca/general/2021/01/05/rollup.html",
      comments: 34,
      retweets: 120,
      likes: 200,
    },
    {
      id: 3,
      username: "Web3 Foundation",
      handle: "@web3foundation",
      date: "Nov 30, 2024",
      text: "What is Web3? A decentralized internet built on blockchain. Learn how it empowers users to own their data and identity!",
      image:
        "https://via.placeholder.com/800x400?text=Web3+Foundation",
      link: "https://web3.foundation/",
      comments: 22,
      retweets: 98,
      likes: 180,
    },
  ];

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-6">Explore Ethereum & Web3</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col bg-white p-4 rounded-lg shadow-md space-y-4"
          >
            {/* Post Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img
                  src="https://via.placeholder.com/100?text=ETH+Profile"
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h2 className="font-bold">{post.username}</h2>
                  <p className="text-sm text-gray-500">
                    {post.handle} • {post.date}
                  </p>
                </div>
              </div>
              <BsThreeDots className="text-gray-500" />
            </div>

            {/* Post Content */}
            <div>
              <p className="text-lg">{post.text}</p>
              <a
                href={post.link}
                className="text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.link}
              </a>
            </div>

            {/* Post Image */}
            {post.image && (
              <div className="w-full">
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full rounded-lg"
                />
              </div>
            )}

            {/* Interaction Buttons */}
            <div className="flex justify-between text-gray-500">
              <div className="flex items-center space-x-1">
                <FaComment />
                <span>{post.comments}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FaRetweet />
                <span>{post.retweets}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FaHeart />
                <span>{post.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExploreEthereum;
