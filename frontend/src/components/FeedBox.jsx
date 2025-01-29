// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import { abi } from "../scdata/TweetContract.json"; // ABI
// import { TwitterModuleTweet } from "../scdata/deployed_addresses.json";
// import { uploadImage } from "../utils/ipfs";

// function App() {
//   const [facebookContent, setFacebookContent] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [provider, setProvider] = useState(null);
//   const [account, setAccount] = useState(null);
//   const [contract, setContract] = useState(null);

//   // Connect to MetaMask and load posts
//   useEffect(() => {
//     const connectToMetamask = async () => {
//       const ethereumProvider = window.ethereum;
//       if (ethereumProvider) {
//         try {
//           const ethersProvider = new ethers.BrowserProvider(ethereumProvider);
//           const signer = await ethersProvider.getSigner();
//           const tweetContract = new ethers.Contract(
//             TwitterModuleTweet,
//             abi,
//             signer
//           );

//           const accounts = await ethereumProvider.request({
//             method: "eth_requestAccounts",
//           });
//           setAccount(accounts[0]);
//           setProvider(ethersProvider);
//           setContract(tweetContract);

//           // Load posts
//           const allposts = await tweetContract.getAllposts();
//           const formattedposts = allposts.map((post, index) => ({
//             id: index,
//             content: post.content,
//             mediaUrl: post.mediaUrl,
//             author: post.author,
//             timestamp: Number(post.timestamp),
//             likeCount: Number(post.likeCount),
//             retweetCount: Number(post.retweetCount),
//           }));
//           setPosts(formattedposts);
//         } catch (error) {
//           console.error("Error connecting to MetaMask:", error);
//         }
//       } else {
//         console.log("Please install MetaMask!");
//       }
//     };
//     connectToMetamask();
//   }, []);

//   const submitTweet = async (e) => {
//     e.preventDefault();
//     if (!facebookContent || !contract) return;

//     let mediaUrl = "";
//     if (imageFile) {
//       try {
//         mediaUrl = await uploadImage(imageFile); // Upload image to Pinata
//       } catch (err) {
//         console.error("Failed to upload image:", err);
//         return;
//       }
//     }

//     try {
//       const tx = await contract.postTweet(facebookContent, mediaUrl);
//       await tx.wait();

//       const newTweet = {
//         id: posts.length,
//         content: facebookContent,
//         mediaUrl: mediaUrl,
//         author: account,
//         timestamp: Math.floor(Date.now() / 1000),
//         likeCount: 0,
//         retweetCount: 0,
//       };
//       setPosts([...posts, newTweet]);
//       setFacebookContent("");
//       setImageFile(null);
//     } catch (err) {
//       console.error("Failed to post post:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navbar */}
//       <nav className="bg-blue-600 w-full py-4 shadow-md">
//         <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
//           <h1 className="text-white text-2xl font-bold">SmartFacebook DApp</h1>
//           <button
//             type="button"
//             onClick={async () => {
//               if (provider) {
//                 const accounts = await provider.send("eth_requestAccounts", []);
//                 setAccount(accounts[0]);
//               }
//             }}
//             className="bg-white text-blue-600 py-2 px-4 rounded-md font-semibold"
//           >
//             {account
//               ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
//               : "Connect Wallet"}
//           </button>
//         </div>
//       </nav>

//       {/* Post Form */}
//       <div className="max-w-2xl mx-auto p-6 mt-8 bg-white rounded-md shadow-md">
//         <textarea
//           value={facebookContent}
//           onChange={(e) => setFacebookContent(e.target.value)}
//           className="w-full h-24 p-3 bg-gray-200 rounded-md outline-none focus:ring-2 ring-blue-500"
//           placeholder="What's on your mind?"
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImageFile(e.target.files[0])}
//           className="mt-4"
//         />
//         <button
//           onClick={submitTweet}
//           className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-md mt-4"
//         >
//           Post
//         </button>
//       </div>

//       {/* posts Section */}
//       <div className="max-w-2xl mx-auto mt-8 space-y-6">
//         {posts.map((post) => (
//           <div
//             key={post.id}
//             className="p-6 bg-white rounded-md shadow-md flex flex-col space-y-4"
//           >
//             {/* Tweet Content */}
//             <p className="text-gray-800">{post.content}</p>
//             {post.mediaUrl && (
//               <img
//                 src={post.mediaUrl}
//                 alt="Tweet Media"
//                 className="rounded-md max-w-full h-auto"
//               />
//             )}
//             <div className="text-gray-600">
//               ❤️ {post.likeCount} 🔗 {post.retweetCount}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi } from "../scdata/FacebookContract.json"; // FacebookContract ABI
import { FacebookModuleFacebookContract } from "../scdata/deployed_addresses.json"; // Contract address
import { uploadImage } from "../utils/ipfs";
import EmojiPicker from "emoji-picker-react"; // Importing emoji picker
import Right from "./Right";
import Navbar from "./Navbar";
import SpinningWheel from "./SpinningWheel";

function App() {
  const [postContent, setPostContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [posts, setPosts] = useState([]);
  const [provider, setProvider] = useState(null);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [deletedPosts, setDeletedPosts] = useState([]);
  const [profilePicture, setProfilePicture] = useState(
    localStorage.getItem("profilePicture") || ""
  );
  const [rewardBalance, setRewardBalance] = useState(0);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showCommentEmojiPicker, setShowCommentEmojiPicker] = useState(false);
  const [openCommentBox, setOpenCommentBox] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleProfilePictureClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const getDeletedPosts = () => {
    if (!account) return [];
    const deleted = localStorage.getItem(`deletedPosts_${account}`);
    return deleted ? JSON.parse(deleted) : [];
  };

  const deletePost = (postId) => {
    const updatedDeleted = [...deletedPosts, postId];
    setDeletedPosts(updatedDeleted);
    localStorage.setItem(`deletedPosts_${account}`, JSON.stringify(updatedDeleted));
  };

  const loadPosts = async () => {
    if (!contract) return;

    try {
      const allPosts = await contract.getAllPosts();
      const formattedPosts = await Promise.all(
        allPosts.map(async (post, index) => {
          const comments = await contract.getComments(index);
          const formattedComments = comments.map((comment) => ({
            content: comment.commentContent,
            commenter: comment.commenter,
            timestamp: Number(comment.timestamp),
          }));
          return {
            id: index,
            content: post.content,
            mediaUrl: post.mediaUrl,
            author: post.author,
            timestamp: Number(post.timestamp),
            likeCount: Number(post.likeCount),
            shareCount: Number(post.shareCount),
            comments: formattedComments,
          };
        })
      );

      const visiblePosts = formattedPosts.filter(
        (post) => !deletedPosts.includes(post.id)
      );

      setPosts(visiblePosts);
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

  useEffect(() => {
    const connectToMetamask = async () => {
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

          const accounts = await ethereumProvider.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);
          setProvider(ethersProvider);
          setContract(facebookContract);

          const deleted = getDeletedPosts();
          setDeletedPosts(deleted);

          await loadPosts();
          await fetchRewardBalance();
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
        }
      } else {
        console.log("Please install MetaMask!");
      }
    };
    connectToMetamask();
  }, [account]);

  const likePost = async (postId) => {
    try {
      const tx = await contract.likePost(postId);
      await tx.wait();
      alert("Post liked successfully!");
      await loadPosts();
    } catch (err) {
      console.error("Failed to like post:", err);
    }
  };

  const commentOnPost = async (postId) => {
    if (!commentText) return;
    try {
      const tx = await contract.commentOnPost(postId, commentText);
      await tx.wait();
      alert("Comment added successfully!");
      setCommentText("");
      await loadPosts();
    } catch (err) {
      console.error("Failed to comment on post:", err);
    }
  };

  const sharePost = async (postId, newContent, newMediaUrl) => {
    try {
      const tx = await contract.share(postId, newContent, newMediaUrl);
      await tx.wait();
  
      // Update posts state with the new share count
      const updatedPosts = posts.map(post =>
        post.id === postId ? { ...post, shareCount: post.shareCount + 1 } : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  const submitPost = async (e) => {
    e.preventDefault();
    if (!postContent || !contract) {
      alert("Post content cannot be empty!");
      return;
    }

    let mediaUrl = "";
    if (imageFile) {
      try {
        mediaUrl = await uploadImage(imageFile);
      } catch (err) {
        console.error("Image upload failed:", err);
        return;
      }
    }

    try {
      const tx = await contract.post(postContent, mediaUrl);
      await tx.wait();
      alert("Post submitted successfully!");
      setPostContent("");
      setImageFile(null);
      await loadPosts();
      await fetchRewardBalance();
    } catch (err) {
      console.error("Failed to submit post:", err.reason || err.message);
    }
  };

  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(postId);
      setPosts(posts.filter((post) => post.id !== postId));
    }
  };

  const addEmojiToPost = (emoji) => {
    setPostContent((prev) => prev + emoji.emoji);
  };

  const addEmojiToComment = (emoji) => {
    setCommentText((prev) => prev + emoji.emoji);
  };
  
  const updateRewardBalance = (newBalance) => {
    setRewardBalance(newBalance); // Update the balance in the App state
  };
  
  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 w-full py-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-white text-3xl font-extrabold tracking-wide hover:scale-105 transform transition-all duration-300 ease-out">
            SmartFacebook DApp
          </h1>
          <div className="flex items-center space-x-4">
            <p className="text-white">Reward Balance: {rewardBalance} Tokens</p>
            <button
              type="button"
              onClick={async () => {
                if (provider) {
                  const accounts = await provider.send("eth_requestAccounts", []);
                  setAccount(accounts[0]);
                  await fetchRewardBalance();
                }
              }}
              className="bg-white text-blue-700 py-2 px-6 rounded-lg font-semibold shadow-md 
                hover:bg-blue-700 hover:text-white hover:scale-110 
                transform transition-all duration-300 ease-in-out"
            >
              {account
                ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
                : "Connect Wallet"}
            </button>
          </div>
          <div className="ml-auto">
            <Navbar />
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-80px)] overflow-hidden">
  {/* Main Content Section */}
  <div
    className="w-3/4 bg-white shadow-md rounded-lg overflow-hidden mx-4"
    style={{
      overflowY: "auto", // Enable vertical scrolling for the main section
      scrollbarWidth: "none", // Firefox
      msOverflowStyle: "none", // IE 10+
    }}
  >
    {/* Hide scrollbar for Chrome, Safari, and Edge */}
    <style>
      {`
        .w-3/4::-webkit-scrollbar {
          display: none;
        }
      `}
    </style>

          {/* Profile Section */}
          <div className="p-6 flex items-center space-x-4 border-b border-gray-200">
            <img
              src={profilePicture || "https://via.placeholder.com/150"}
              alt="Avatar"
              className="w-20 h-20 rounded-md object-cover"
              onClick={handleProfilePictureClick}
            />
            <div>
              <h1 className="text-2xl font-bold">{username || "Loading..."}</h1>
              <p className="text-gray-500">@{account || "Loading..."}</p>
            </div>
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

          {/* Post Form */}
          <div className="p-6">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="w-full h-24 p-3 bg-gray-200 text-black rounded-md outline-none focus:ring-2 ring-blue-500"
              placeholder="What's on your mind?"
            />
            <div className="relative">
              <button
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className="bg-gray-300 p-2 rounded-md mt-2"
              >
                😊
              </button>
              {showEmojiPicker && (
                <div className="absolute z-50">
                  <EmojiPicker onEmojiClick={addEmojiToPost} />
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="mt-4"
            />
            <button
              onClick={submitPost}
              className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-md mt-4"
            >
              Post
            </button>
          </div>

          {/* Posts */}
          <div className="space-y-6 p-6">
            {posts.length === 0 ? (
              <p className="text-center text-gray-500">
                No posts yet. Be the first to share!
              </p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white p-4 rounded-md shadow-md border border-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{post.author}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(post.timestamp * 1000).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="text-red-500 font-bold hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-gray-700 mt-2">{post.content}</p>
                  {post.mediaUrl && (
                    <img
                      src={post.mediaUrl}
                      alt="Tweet Media"
                      className="w-full max-h-64 object-cover rounded-md mt-2"
                    />
                  )}
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => likePost(post.id)}
                      className="text-blue-500 font-semibold hover:underline"
                    >
                      Like ({post.likeCount})
                    </button>
                    <button
                    onClick={() => sharePost(post.id, post.content, post.mediaUrl)}
                    className="text-green-500 font-semibold hover:underline"
                    >
                    Share ({post.shareCount})
                   </button>
                  </div>
                  <div className="mt-4">
                  <button
                    onClick={() => setOpenCommentBox((prev) => (prev === post.id ? null : post.id))}
                    className="mt-2 bg-gray-500 hover:bg-gray-400 text-white font-bold py-1 px-4 rounded-md"
                  >
                    {openCommentBox === post.id ? "Hide Comment Box" : "Add Comment"}
                  </button>
                  {openCommentBox === post.id && (
                    <>
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="w-full p-2 bg-gray-100 text-black rounded-md outline-none"
                        placeholder="Add a comment..."
                      />
                      <div className="relative">
                        <button
                          onClick={() => setShowCommentEmojiPicker((prev) => !prev)}
                          className="bg-gray-300 p-2 rounded-md mt-2"
                        >
                          😊
                        </button>
                        {showCommentEmojiPicker && (
                          <div className="absolute z-50">
                            <EmojiPicker onEmojiClick={addEmojiToComment} />
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => commentOnPost(post.id)}
                        className="mt-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-4 rounded-md"
                      >
                        Comment
                      </button>
                    </>
                  )}
                </div>

                  {post.comments && post.comments.length > 0 && (
                    <div className="mt-4">
                      <p className="text-gray-600 font-semibold">Comments:</p>
                      {post.comments.map((comment, idx) => (
                        <div key={idx} className="mt-2">
                          <p>
                            <span className="font-bold">{comment.commenter}:</span>{" "}
                            {comment.content}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(comment.timestamp * 1000).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
  
        {/* Right Section (Ads) */}
        <div className="w-1/4 bg-gray-200 p-4 hidden lg:block">
          <h2 className="text-xl font-bold mb-4">Sponsored</h2>

            {/* Fun Interactive GIF */}
            <div className="bg-white p-4 rounded-md shadow-md mb-4">
            <h3 className="text-lg font-bold mb-2">Trending GIF</h3>
            <img
              src="https://media.giphy.com/media/3o7abldj0b3rxrZUxW/giphy.gif"
              alt="Trending GIF"
              className="w-full rounded-md"
            />
            <p className="text-gray-500 mt-2 text-sm">
              Enjoy this fun trending GIF!
            </p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md mb-4">
          <SpinningWheel/>
           </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <Right />
          </div>

          {/* Simple Interactive Game */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-bold mb-2">Mini Game</h3>
            <div className="text-center">
              <p className="text-gray-500 mb-2 text-sm">Click to roll a dice!</p>
              <button
                onClick={() => alert(`You rolled a ${Math.floor(Math.random() * 6) + 1}!`)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300"
              >
                Roll Dice
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
}

export default App;

