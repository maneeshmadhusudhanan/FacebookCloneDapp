import React from "react";

const Friends = () => {
  const friends = [
    { name: "Alice Johnson", avatar: "https://via.placeholder.com/150" },
    { name: "Bob Smith", avatar: "https://via.placeholder.com/150" },
    { name: "Charlie Brown", avatar: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md py-4 px-6">
        <h1 className="text-xl font-bold text-blue-600">Friends</h1>
      </div>
      <div className="mt-4 px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {friends.map((friend, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
            <img
              src={friend.avatar}
              alt={friend.name}
              className="w-16 h-16 rounded-full"
            />
            <p className="font-semibold">{friend.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
