import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Right from './components/Right';
import Explore from './components/Explore';  
import Profile from './components/Profile';
import PostPage from './components/PotosPage';
import About from './components/AboutPage';








function App() {
  return (
    <Router>
      <div className="flex">

        <Sidebar />

        <div className="flex-grow flex flex-row justify-between">
          {/* Middle Section with Routing */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/home" element={<Home />} />
              <Route path="/explore" element={<Explore />} /> 
              <Route path="/PostPage" element={<PostPage/>} /> 
              <Route path="/About" element={<About/>} /> 







{/* 
              <Link to="/posts" className="text-blue-500 font-semibold">Posts</Link>
              <Link to="/about" className="text-gray-500">About</Link>
              <Link to="/friends" className="text-gray-500">Friends</Link>     
              <Link to="/photos" className="text-gray-500">Photos</Link>
              <Link to="/more" className="text-gray-500">More</Link> */}




            </Routes>
          </div>
          
          {/* Right Section */}
         
        </div>
      </div>
    </Router>
  );
}

export default App;
