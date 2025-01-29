import React from "react";

const Posts = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md py-4 px-6">
        <h1 className="text-xl font-bold text-blue-600">Posts</h1>
      </div>
      <div className="mt-4 px-8">
        <div className="bg-white shadow rounded-lg p-4 space-y-6">
          <div className="bg-white shadow rounded-lg p-4">
            <textarea
              className="w-full border border-gray-300 rounded-lg mt-2 p-2"
              placeholder="What's on your mind?"
            ></textarea>
            <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-full float-right">
              Post
            </button>
          </div>
          <div className="space-y-4">
            <div className="bg-white shadow p-4 rounded-lg">
              <p className="font-bold">John Doe</p>
              <p>This is my first post!</p>
            </div>
            <div className="bg-white shadow p-4 rounded-lg">
              <p className="font-bold">Jane Smith</p>
              <p>Excited to be on this platform!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
