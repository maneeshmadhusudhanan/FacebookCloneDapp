import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start">
      {/* Main Container */}
      <div className="bg-white w-full max-w-5xl rounded-lg shadow-md mt-6 p-6">
        {/* Header */}
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold text-blue-600">About</h1>
          <p className="text-gray-600 mt-1">
            Discover what makes SmartFacebook unique and who’s behind it!
          </p>
        </div>

        {/* About SmartFacebook */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">What is SmartFacebook?</h2>
          <p className="text-gray-700 mt-2 leading-relaxed">
            SmartFacebook is a decentralized social networking platform designed to empower users with full control over their data. 
            Built on blockchain technology, it ensures privacy, transparency, and security. Unlike traditional platforms, 
            SmartFacebook leverages smart contracts for seamless and censorship-free interactions.
          </p>
          <div className="bg-blue-50 p-4 mt-4 rounded-lg">
            <strong className="text-blue-600">Our Mission:</strong> To create a secure and user-centric social media experience 
            that rewards users for their engagement and promotes decentralization.
          </div>
        </div>

        {/* Personal Information */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <p><strong>Bio:</strong> Full Stack Developer with a passion for blockchain.</p>
              <p><strong>Education:</strong> Blockchain University</p>
            </div>
            <div>
              <p><strong>Work:</strong> SmartFacebook DApp Developer</p>
              <p><strong>Location:</strong> Kerala, India</p>
            </div>
          </div>
        </div>

        {/* Creator Info */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800">Created By</h2>
          <p className="text-gray-700 mt-2 leading-relaxed">
            This project was developed by <strong>Maneesh Madhusudhanan</strong> under the guidance and support of 
            <strong> Kerala Blockchain Academy (KBA)</strong>. KBA is a globally recognized center of excellence for blockchain 
            technology, empowering developers and innovators to build the future of decentralized applications.
          </p>
        </div>

        {/* Interactive Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
                🔒
              </div>
              <p className="mt-2 font-bold text-gray-800">Secure</p>
              <p className="text-gray-600 text-sm">
                Blockchain ensures your data remains private and secure.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold">
                💸
              </div>
              <p className="mt-2 font-bold text-gray-800">Rewarding</p>
              <p className="text-gray-600 text-sm">
                Earn tokens for your contributions and engagement.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl font-bold">
                🌐
              </div>
              <p className="mt-2 font-bold text-gray-800">Decentralized</p>
              <p className="text-gray-600 text-sm">
                Complete control over your data with no intermediaries.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600">
          <p>
            Want to know more? Visit <a href="https://keralablockchainacademy.com" className="text-blue-600 underline">Kerala Blockchain Academy</a>
          </p>
          <p className="mt-1">© 2025 SmartFacebook. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
