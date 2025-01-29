import React from "react";

const Photos = () => {
  const photos = Array.from({ length: 12 }, (_, i) => `https://via.placeholder.com/150?text=Photo+${i + 1}`);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md py-4 px-6">
        <h1 className="text-xl font-bold text-blue-600">Photos</h1>
      </div>
      <div className="mt-4 px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Photo ${index + 1}`}
            className="w-full h-40 object-cover rounded-lg shadow"
          />
        ))}
      </div>
    </div>
  );
};

export default Photos;
