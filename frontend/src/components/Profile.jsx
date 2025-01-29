import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi } from "../scdata/FacebookContract.json"; // Smart contract ABI
import { FacebookModuleFacebookContract } from "../scdata/deployed_addresses.json"; // Contract address
import { uploadImage } from "../utils/ipfs"; // Utility for uploading images to IPFS

const Profile = () => {
  const [account, setAccount] = useState(localStorage.getItem("walletAddress"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [posts, setPosts] = useState([]);
  const [contract, setContract] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [profilePicture, setProfilePicture] = useState(
    localStorage.getItem("profilePicture") || ""
  );
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [rewardBalance, setRewardBalance] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const handleProfilePictureClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const connectToContract = async () => {
      const ethereumProvider = window.ethereum;
      if (ethereumProvider) {
        try {
          const ethersProvider = new ethers.BrowserProvider(ethereumProvider);
          const signer = await ethersProvider.getSigner();
          const facebookContract = new ethers.Contract(
            FacebookModuleFacebookContract,
            abi,
            signer
          );

          setContract(facebookContract);
        } catch (error) {
          console.error("Error connecting to contract:", error);
        }
      } else {
        console.error("Ethereum provider not found. Install MetaMask.");
      }
    };

    connectToContract();
  }, []);

  useEffect(() => {
    if (contract && account) {
      loadUserPosts();
      fetchRewardBalance();
    }
    const fetchProfilePicture = async () => {
      if (contract && account) {
        try {
          const pictureUrl = await contract.getProfilePicture(account);
          if (pictureUrl) {
            setProfilePicture(pictureUrl);
            localStorage.setItem("profilePicture", pictureUrl);
          }
        } catch (err) {
          console.error("Failed to fetch profile picture:", err);
        }
      }
    };

    fetchProfilePicture();
  }, [contract, account]);

  const saveProfile = async () => {
    if (newUsername) {
      setUsername(newUsername);
      localStorage.setItem("username", newUsername);
    }

    if (newProfilePicture) {
      try {
        // Upload image to IPFS and get the hash
        const uploadedUrl = await uploadImage(newProfilePicture);

        // Update the profile picture on the blockchain
        const tx = await contract.updateProfilePicture(uploadedUrl);
        await tx.wait();

        // Update the local state and storage
        setProfilePicture(uploadedUrl);
        localStorage.setItem("profilePicture", uploadedUrl);
        alert("Profile picture updated successfully!");
      } catch (err) {
        console.error("Failed to update profile picture:", err);
        alert("Error updating profile picture.");
      }
    }

    setEditingProfile(false);
  };

  const submitPost = async (e) => {
    e.preventDefault();
    if (!postContent || !contract) return;

    let mediaUrl = "";
    if (imageFile) {
      try {
        mediaUrl = await uploadImage(imageFile);
      } catch (err) {
        console.error("Failed to upload image:", err);
        return;
      }
    }

    try {
      const tx = await contract.post(postContent, mediaUrl);
      await tx.wait();
      alert("Post created successfully!");
      setPostContent("");
      setImageFile(null);
      loadUserPosts();
      fetchRewardBalance();
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  const loadUserPosts = async () => {
    if (!contract || !account) return;

    try {
      const allPosts = await contract.getAllPosts();
      const userPosts = allPosts
        .map((post, index) => ({
          id: index,
          content: post.content || "",
          mediaUrl: post.mediaUrl || "",
          author: post.author,
          timestamp: post.timestamp ? Number(post.timestamp) : 0,
        }))
        .filter((post) => post.author.toLowerCase() === account.toLowerCase());
      setPosts(userPosts);
    } catch (err) {
      console.error("Failed to load posts:", err);
    }
  };

  const fetchRewardBalance = async () => {
    if (!contract || !account) return;
    try {
      const balance = await contract.getRewardBalance(account);
      setRewardBalance(ethers.formatUnits(balance, 18));
    } catch (err) {
      console.error("Failed to fetch reward balance:", err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 w-full py-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-white font-bold ">Smart Facebook DApp</h1>
          <div className="flex items-center space-x-3">
            <img
              src={profilePicture || "https://via.placeholder.com/150"}
              alt="Avatar"
              className="w-8 h-8 rounded-full border"
            />
            <span className="font-medium text-gray-700">{username || "Loading..."}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-20 px-4">
        {/* Cover Photo */}
        <div className="relative bg-blue-200 h-48 rounded-lg overflow-hidden shadow">
          <div className="absolute bottom-[-40px] left-4">
            <img
              src={profilePicture || "https://via.placeholder.com/150"}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-white cursor-pointer"
              onClick={handleProfilePictureClick}
            />
          </div>
        </div>

        {/* Profile Header */}
        <div className="mt-16 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{username || "Loading..."}</h1>
            <p className="text-gray-500">@{account || "Loading..."}</p>
          </div>
          <button
            onClick={() => setEditingProfile(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>

        {/* Modal for Profile Picture */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white p-4 rounded-lg shadow-lg">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded-full hover:bg-gray-800"
              >
                &times;
              </button>
              <img
                src={profilePicture || "https://via.placeholder.com/150"}
                alt="Profile Large"
                className="w-full h-auto max-w-md rounded-lg"
              />
            </div>
          </div>
        )}
        {/* Edit Profile Modal */}
        {editingProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-bold">Edit Profile</h2>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="block w-full mt-2 p-2 border rounded-md"
                placeholder="New Username"
              />
              <input
                type="file"
                onChange={(e) => setNewProfilePicture(e.target.files[0])}
                className="block w-full mt-4"
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setEditingProfile(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProfile}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reward Tokens */}
        <div className="mt-8 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold">Reward Tokens</h2>
          <p className="text-gray-700 mt-2">
            Balance: <span className="text-blue-500">{rewardBalance} RWT</span>
          </p>
          <button
            onClick={fetchRewardBalance}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Refresh Balance
          </button>
        </div>

        {/* Create Post */}
        <div className="mt-8 bg-white p-4 rounded-lg shadow">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="w-full h-24 border p-2 rounded-md"
            placeholder="What's on your mind?"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="mt-4"
          />
          <button
            onClick={submitPost}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Post
          </button>
        </div>

        {/* User Posts */}
        <div className="mt-8">
          <h2 className="text-xl font-bold">My Posts</h2>
          {posts.length === 0 ? (
            <p className="text-gray-500 mt-4">No posts yet.</p>
          ) : (
            <div className="space-y-4 mt-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-white p-4 rounded-md shadow">
                  <p>{post.content}</p>
                  {post.mediaUrl && (
                    <img
                      src={post.mediaUrl}
                      alt="Post Media"
                      className="mt-2 rounded"
                    />
                  )}
                  <p className="text-sm text-gray-500 mt-2">
                    Posted on: {new Date(post.timestamp * 1000).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;


// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import { abi } from "../scdata/TweetContract.json"; // Smart contract ABI
// import { FacebookModuleFacebookContract } from "../scdata/deployed_addresses.json"; // Contract address

// const Profile = () => {
//   const [account, setAccount] = useState(localStorage.getItem("walletAddress"));
//   const [username, setUsername] = useState(localStorage.getItem("username"));
//   const [tweets, setTweets] = useState([]);
//   const [contract, setContract] = useState(null);

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username");
//     if (storedUsername) {
//       setUsername(storedUsername);
//     }
//   }, []);

//   useEffect(() => {
//     const connectToContract = async () => {
//       const ethereumProvider = window.ethereum;
//       if (ethereumProvider) {
//         try {
//           const ethersProvider = new ethers.BrowserProvider(ethereumProvider);
//           const signer = await ethersProvider.getSigner();
//           const tweetContract = new ethers.Contract(
//             FacebookModuleFacebookContract,
//             abi,
//             signer
//           );

//           setContract(tweetContract);

//           const allTweets = await tweetContract.getAllTweets();
//           const userTweets = allTweets.filter(
//             (tweet) => tweet.author.toLowerCase() === account.toLowerCase()
//           );

//           const processedTweets = userTweets.map((tweet, index) => ({
//             id: index,
//             content: tweet.content,
//             author: tweet.author,
//             timestamp: Number(tweet.timestamp),
//             likeCount: Number(tweet.likeCount),
//             retweetCount: Number(tweet.retweetCount),
//           }));

//           setTweets(processedTweets);
//         } catch (error) {
//           console.error("Error connecting to contract:", error);
//         }
//       }
//     };

//     if (account) {
//       connectToContract();
//     }
//   }, [account]);

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* Navbar */}
//       <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
//         <h1 className="text-xl font-bold text-blue-600">SMART FACEBOOK DAPP</h1>
//         <input
//           type="text"
//           placeholder="Search Facebook"
//           className="border border-gray-300 rounded-full px-4 py-2 w-1/3"
//         />
//         <div className="flex items-center space-x-4">
//           <img
//             src="https://abs.twimg.com/icons/apple-touch-icon-192x192.png"
//             alt="Avatar"
//             className="w-10 h-10 rounded-full"
//           />
//           <p className="font-semibold text-gray-700">{username || "Loading..."}</p>
//         </div>
//       </div>

//       {/* Cover Photo and Profile Section */}
//       <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 h-56">
//         <div className="absolute bottom-[-40px] left-8">
//           <img
//             src="https://abs.twimg.com/icons/apple-touch-icon-192x192.png"
//             alt="Avatar"
//             className="w-32 h-32 rounded-full border-4 border-white"
//           />
//         </div>
//       </div>

//       <div className="mt-16 px-8">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold">{username || "Loading..."}</h1>
//             <p className="text-gray-500">@{account || "Loading..."}</p>
//           </div>
//           <button className="bg-blue-500 text-white px-4 py-2 rounded-full shadow">
//             Edit Profile
//           </button>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="mt-6 border-t border-gray-300">
//         <div className="flex space-x-8 px-8 py-4">
//           <button className="text-blue-500 font-semibold">Posts</button>
//           <button className="text-gray-500">About</button>
//           <button className="text-gray-500">Friends</button>
//           <button className="text-gray-500">Photos</button>
//           <button className="text-gray-500">More</button>
//         </div>
//       </div>

//       {/* Posts Section */}
//       <div className="mt-4 px-8">
//         <div className="bg-white shadow rounded-lg p-4">
//           <h2 className="text-lg font-semibold">Create Post</h2>
//           <textarea
//             className="w-full border border-gray-300 rounded-lg mt-2 p-2"
//             placeholder="What's on your mind?"
//           />
//           <div className="flex justify-end mt-2">
//             <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
//               Post
//             </button>
//           </div>
//         </div>

//         <div className="mt-6 space-y-4">
//           {tweets.length === 0 ? (
//             <p className="text-center text-gray-500">No posts yet.</p>
//           ) : (
//             tweets.map((tweet) => (
//               <div
//                 key={tweet.id}
//                 className="bg-white shadow rounded-lg p-4 space-y-2"
//               >
//                 <p>{tweet.content}</p>
//                 <p className="text-sm text-gray-500">
//                   {new Date(tweet.timestamp * 1000).toLocaleString()}
//                 </p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;





// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import { abi } from "../scdata/TweetContract.json"; // Smart contract ABI
// import { FacebookModuleFacebookContract } from "../scdata/deployed_addresses.json"; // Contract address

// const Profile = () => {
//   const [account, setAccount] = useState(localStorage.getItem("walletAddress"));
//   const [username, setUsername] = useState(localStorage.getItem("username")); // Retrieve from localStorage
//   const [tweets, setTweets] = useState([]);
//   const [contract, setContract] = useState(null);

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username");
//     if (storedUsername) {
//       setUsername(storedUsername);
//     }
//   }, []);

//   useEffect(() => {
//     const connectToContract = async () => {
//       const ethereumProvider = window.ethereum;
//       if (ethereumProvider) {
//         try {
//           const ethersProvider = new ethers.BrowserProvider(ethereumProvider);
//           const signer = await ethersProvider.getSigner();
//           const tweetContract = new ethers.Contract(
//             FacebookModuleFacebookContract,
//             abi,
//             signer
//           );

//           setContract(tweetContract);

//           // Load tweets for this user (filtered by account)
//           const allTweets = await tweetContract.getAllTweets();
//           console.log("All Tweets:", allTweets); // Debugging line

//           const userTweets = allTweets.filter(
//             (tweet) => tweet.author.toLowerCase() === account.toLowerCase()
//           );

//           // Convert BigInt timestamps to numbers if necessary and map properties
//           const processedTweets = userTweets.map((tweet, index) => ({
//             id: index, // Assign a unique identifier
//             content: tweet.content, // Explicitly map 'content'
//             author: tweet.author,
//             timestamp: Number(tweet.timestamp), // Convert BigInt to number
//             likeCount: Number(tweet.likeCount),
//             retweetCount: Number(tweet.retweetCount),
//           }));

//           setTweets(processedTweets);
//         } catch (error) {
//           console.error("Error connecting to contract:", error);
//         }
//       }
//     };

//     if (account) {
//       connectToContract();
//     }
//   }, [account]);

//   return (
//     <>
    
    
//     // <div
// className="min-h-screen text-black flex flex-col items-center"
// style={{
//   backgroundImage:
//     "url('https://videocdn.cdnpk.net/videos/af9b822f-03cd-4daa-8b17-68f2ed6267db/horizontal/thumbnails/large.jpg')",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
// }}
// >
// <div className="w-full max-w-2xl p-6 shadow-md mt-16">
//   <div className="flex items-center">
//     <img
//       src="https://abs.twimg.com/icons/apple-touch-icon-192x192.png"
//       alt="Avatar"
//       className="w-24 h-24 rounded-full"
//     />
// //     <div className="ml-6">
// //       <h1 className="text-2xl text-white font-bold">
// //         {username ? username : "Loading..."}
// //       </h1>
// //       <p className="text-white">
// //         @{account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Loading..."}
// //       </p>
// //     </div>
// //   </div>
// //   <div className="mt-6">
// //     <h2 className="text-xl font-bold text-white">Your Tweets</h2>
// //     {tweets.length === 0 ? (
//       <p className="text-center text-gray-400">No tweets yet.</p>
//     ) : (
//       tweets.map((tweet) => (
//         <div key={tweet.id} className="p-4 bg-gray-100 rounded-md mt-4">
//           <p>{tweet.content}</p> {/* Ensure 'content' is displayed */}
//           <p className="text-sm text-gray-500">
//             {new Date(tweet.timestamp * 1000).toLocaleString()}
//           </p>
//         </div>
//       ))
//     )}
//   </div>
// </div>
// <div>
//   <a
//     href="/home"
//     className="flex items-center space-x-4 text-xl text-black hover:text-blue-500"
//   >
//     <span className="mt-8 w-full bg-white text-blue-500 py-2 rounded-full text-xl hover:bg-blue-600 px-8">
//       Tweet
//     </span>
//   </a>
// </div>
// </div>
    
    
//     </>
//   );
// };

// export default Profile;



// <div
// className="min-h-screen text-black flex flex-col items-center"
// style={{
//   backgroundImage:
//     "url('https://videocdn.cdnpk.net/videos/af9b822f-03cd-4daa-8b17-68f2ed6267db/horizontal/thumbnails/large.jpg')",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
// }}
// >
// <div className="w-full max-w-2xl p-6 shadow-md mt-16">
//   <div className="flex items-center">
//     <img
//       src="https://abs.twimg.com/icons/apple-touch-icon-192x192.png"
//       alt="Avatar"
//       className="w-24 h-24 rounded-full"
//     />
//     <div className="ml-6">
//       <h1 className="text-2xl text-white font-bold">
//         {username ? username : "Loading..."}
//       </h1>
//       <p className="text-white">
//         @{account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Loading..."}
//       </p>
//     </div>
//   </div>
//   <div className="mt-6">
//     <h2 className="text-xl font-bold text-white">Your Tweets</h2>
//     {tweets.length === 0 ? (
//       <p className="text-center text-gray-400">No tweets yet.</p>
//     ) : (
//       tweets.map((tweet) => (
//         <div key={tweet.id} className="p-4 bg-gray-100 rounded-md mt-4">
//           <p>{tweet.content}</p> {/* Ensure 'content' is displayed */}
//           <p className="text-sm text-gray-500">
//             {new Date(tweet.timestamp * 1000).toLocaleString()}
//           </p>
//         </div>
//       ))
//     )}
//   </div>
// </div>
// <div>
//   <a
//     href="/home"
//     className="flex items-center space-x-4 text-xl text-black hover:text-blue-500"
//   >
//     <span className="mt-8 w-full bg-white text-blue-500 py-2 rounded-full text-xl hover:bg-blue-600 px-8">
//       Tweet
//     </span>
//   </a>
// </div>
// </div>