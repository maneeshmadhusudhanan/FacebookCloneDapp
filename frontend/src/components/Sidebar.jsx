
import React from 'react';
import { FaHome, FaUsers, FaComments, FaBell, FaUser, FaCogs } from 'react-icons/fa';
import { AiFillShop } from 'react-icons/ai'; // Marketplace icon
import { BsFillBookmarkFill, BsFillQuestionCircleFill } from 'react-icons/bs'; // Saved and Help icons
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-1/6 h-screen flex flex-col p-4 bg-gray-100 shadow-md">
      {/* SmartFacebook Logo */}
      <div className="text-2xl font-bold mb-8 flex items-center">
        <div className="text-blue-600 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          SF
        </div>
       
      </div>

      {/* Navigation */}
      <nav className="space-y-6 w-full font-medium text-gray-800">
      <Link
          to="/profile"
          className="flex items-center space-x-4 text-lg hover:text-blue-500"
        >
          <FaUser className="text-2xl" />
          <span>Profile</span>
        </Link>
        <Link
          to="/home"
          className="flex items-center space-x-4 text-lg hover:text-blue-500"
        >
          <FaHome className="text-2xl" />
          <span>Home</span>
        </Link>
        <Link
          to="/explore"
          className="flex items-center space-x-4 text-lg hover:text-blue-500"
        >
          <FaComments className="text-2xl" />
          <span>Explore</span>
        </Link>
        <Link
          to="/notifications"
          className="flex items-center space-x-4 text-lg hover:text-blue-500"
        >
          <FaBell className="text-2xl" />
          <span>Notifications</span>
        </Link>

        <Link
          to="/saved"
          className="flex items-center space-x-4 text-lg hover:text-blue-500"
        >
          <BsFillBookmarkFill className="text-2xl" />
          <span>Saved</span>
        </Link>
        <Link
          to="/friends"
          className="flex items-center space-x-4 text-lg hover:text-blue-500"
        >
          <FaUsers className="text-2xl" />
          <span>Friends</span>
        </Link>
        <Link
          to="/settings"
          className="flex items-center space-x-4 text-lg hover:text-blue-500"
        >
          <FaCogs className="text-2xl" />
          <span>Settings</span>
        </Link>
        <Link
          to="/help"
          className="flex items-center space-x-4 text-lg hover:text-blue-500"
        >
          <BsFillQuestionCircleFill className="text-2xl" />
          <span>Help</span>
        </Link>

        <Link
          to="/About"
          className="flex items-center space-x-4 text-lg hover:text-blue-500"
        >
          <BsFillQuestionCircleFill className="text-2xl" />
          <span>About</span>
        </Link>


      </nav>
    </div>
  );
}

export default Sidebar;




// import React from 'react';
// import { FaHome, FaHashtag, FaBell, FaEnvelope, FaBookmark, FaList, FaUser, FaEllipsisH } from 'react-icons/fa';
// import { BsTwitter } from 'react-icons/bs'; // Twitter logo icon
// import { Link } from 'react-router-dom';

// function Sidebar() {
//   return (
//     <div className="w-1/6 h-screen flex flex-col p-4 items-start">
//       {/* Facebook Logo */}
//       <div className="text-2xl font-bold mb-6">
//         <BsTwitter className="text-blue-500 w-10 h-10" />
//       </div>

//       {/* Navigation */}
//       <nav className="space-y-6 w-full font-bold text-black">
//         <a href="/home" className="flex items-center space-x-4 text-xl text-black hover:text-blue-500">
//           <FaHome className="text-2xl" />
//           <span>Home</span>
//         </a>
//         <Link to="/explore" className="flex items-center space-x-4 text-xl text-black hover:text-blue-500">
//           <FaHashtag className="text-2xl" />
//           <span>Explore</span>
//         </Link>
//         <a href="#" className="flex items-center space-x-4 text-xl text-black hover:text-blue-500">
//           <FaBell className="text-2xl" />
//           <span>Notifications</span>
//         </a>
//         <a href="#" className="flex items-center space-x-4 text-xl text-black hover:text-blue-500">
//           <FaEnvelope className="text-2xl" />
//           <span>Messages</span>
//         </a>
//         <a href="#" className="flex items-center space-x-4 text-xl text-black hover:text-blue-500">
//           <FaBookmark className="text-2xl" />
//           <span>Bookmarks</span>
//         </a>
//         <a href="#" className="flex items-center space-x-4 text-xl text-black hover:text-blue-500">
//           <FaList className="text-2xl" />
//           <span>Lists</span>
//         </a>
//         <a href="/profile" className="flex items-center space-x-4 text-xl text-black hover:text-blue-500">
//           <FaUser className="text-2xl" />
//           <span>Profile</span>
//         </a>
//         <a href="#" className="flex items-center space-x-4 text-xl text-black hover:text-blue-500">
//           <FaEllipsisH className="text-2xl" />
//           <span>More</span>
//         </a>
//       </nav>

    
//     </div>
//   );
// }

// export default Sidebar;
