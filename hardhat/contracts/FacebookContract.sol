
// pragma solidity ^0.8.0;

// contract POSTContract {
//     struct POST {
//         string content; // Text content of the POST
//         string mediaUrl; // URL for either an image or video
//         address author;
//         uint256 timestamp;
//         uint256 likeCount;
//         uint256 rePOSTCount;
//     }

//     struct Comment {
//         string commentContent;
//         address commenter;
//         uint256 timestamp;
//     }

//     POST[] public POSTs;
//     mapping(uint256 => address[]) public POSTLikes; // Track users who liked a specific POST
//     mapping(uint256 => Comment[]) public POSTComments; // Track comments on each POST

//     event NewPOST(
//         string content,
//         string mediaUrl,
//         address indexed author,
//         uint256 timestamp
//     );
//     event NewLike(uint256 POSTId, address indexed user);
//     event NewComment(
//         uint256 POSTId,
//         string commentContent,
//         address indexed commenter,
//         uint256 timestamp
//     );
//     event NewRePOST(
//         uint256 POSTId,
//         address indexed rePOSTer,
//         string content,
//         string mediaUrl,
//         uint256 timestamp
//     );

//     // Post a new POST with optional media URL
//     function postPOST(string memory content, string memory mediaUrl) public {
//         POST memory newPOST = POST({
//             content: content,
//             mediaUrl: mediaUrl,
//             author: msg.sender,
//             timestamp: block.timestamp,
//             likeCount: 0,
//             rePOSTCount: 0
//         });

//         POSTs.push(newPOST);
//         emit NewPOST(content, mediaUrl, msg.sender, block.timestamp);
//     }

//     // Like a POST
//     function likePOST(uint256 POSTId) public {
//         require(POSTId < POSTs.length, "Invalid POST ID");
//         POSTLikes[POSTId].push(msg.sender);
//         POSTs[POSTId].likeCount++;
//         emit NewLike(POSTId, msg.sender);
//     }

//     // Comment on a POST
//     function commentOnPOST(uint256 POSTId, string memory commentContent) public {
//         require(POSTId < POSTs.length, "Invalid POST ID");

//         Comment memory newComment = Comment({
//             commentContent: commentContent,
//             commenter: msg.sender,
//             timestamp: block.timestamp
//         });

//         POSTComments[POSTId].push(newComment);
//         emit NewComment(POSTId, commentContent, msg.sender, block.timestamp);
//     }

//     // RePOST a POST with optional new content and media URL
//     function rePOST(uint256 POSTId, string memory newContent, string memory newMediaUrl) public {
//         require(POSTId < POSTs.length, "Invalid POST ID");

//         POST memory newPOST = POST({
//             content: newContent,
//             mediaUrl: newMediaUrl,
//             author: msg.sender,
//             timestamp: block.timestamp,
//             likeCount: 0,
//             rePOSTCount: 0
//         });

//         POSTs.push(newPOST);
//         POSTs[POSTId].rePOSTCount++;
//         emit NewRePOST(POSTId, msg.sender, newContent, newMediaUrl, block.timestamp);
//     }

//     // Get all POSTs
//     function getAllPOSTs() public view returns (POST[] memory) {
//         return POSTs;
//     }

//     // Get comments on a specific POST
//     function getComments(uint256 POSTId) public view returns (Comment[] memory) {
//         return POSTComments[POSTId];
//     }

//     // Get users who liked a specific POST
//     function getLikes(uint256 POSTId) public view returns (address[] memory) {
//         return POSTLikes[POSTId];
//     }
// }

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./RewardToken.sol";

contract FacebookContract {
    struct Post {
        string content; // Text content of the POST
        string mediaUrl; // URL for either an image or video
        address author;
        uint256 timestamp;
        uint256 likeCount;
        uint256 shareCount;
    }

    struct Comment {
        string commentContent;
        address commenter;
        uint256 timestamp;
    }

    struct UserProfile {
        string profilePicture; // URL to the profile picture
        uint256 rewardBalance; // Reward token balance 
    }

    Post[] public posts;
    mapping(uint256 => address[]) public postLikes; // Track users who liked a specific POST
    mapping(uint256 => Comment[]) public postComments; // Track comments on each POST
    mapping(address => UserProfile) public userProfiles; // Track user profile details by address

    RewardToken public rewardToken;
    uint256 public rewardAmountPerPost = 10 * 10 ** 18; // Reward 10 tokens per POST
    uint256 public spinCost = 2 * 10 ** 18; // Cost to spin the wheel

    event NewPost(
        string content,
        string mediaUrl,
        address indexed author,
        uint256 timestamp
    );
    event NewLike(uint256 postId, address indexed user);
    event NewComment(
        uint256 postId,
        string commentContent,
        address indexed commenter,
        uint256 timestamp
    );
    event NewShare(
        uint256 postId,
        address indexed shareduser,
        string content,
        string mediaUrl,
        uint256 timestamp
    );
    event ProfilePictureUpdated(address indexed user, string profilePicture);
    event RewardIssued(address indexed user, uint256 amount);
    event SpinResult(address indexed user, uint256 reward);

    constructor() {
        rewardToken = RewardToken(0xa24A520B0A0Ef6a44b3bdebfc3026D1fc8F5d4ce); // Replace with actual deployed address
    }

    // Post a new POST with optional media URL
    function post(string memory content, string memory mediaUrl) public {
        Post memory newPost = Post({
            content: content,
            mediaUrl: mediaUrl,
            author: msg.sender,
            timestamp: block.timestamp,
            likeCount: 0,
            shareCount: 0
        });

        posts.push(newPost);

        // Issue reward for posting a POST
        rewardToken.mint(msg.sender, rewardAmountPerPost);
        userProfiles[msg.sender].rewardBalance += rewardAmountPerPost;

        emit NewPost(content, mediaUrl, msg.sender, block.timestamp);
        emit RewardIssued(msg.sender, rewardAmountPerPost);
    }

    function spinWheel() public {
        // Ensure the user has enough tokens and has approved the contract to spend them
        require(
            rewardToken.balanceOf(msg.sender) >= spinCost,
            "Insufficient balance to spin the wheel"
        );
        require(
            rewardToken.allowance(msg.sender, address(this)) >= spinCost,
            "Approve tokens to spin the wheel"
        );

        // Deduct spin cost from the user's balance
        rewardToken.transferFrom(msg.sender, address(this), spinCost);

        // Generate a random reward between 10 and 50 tokens
        uint256 reward = (uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender))
        ) % 41 + 10) * 10 ** 18; // Random reward: 10-50 tokens

        // Credit reward to user
        rewardToken.mint(msg.sender, reward);
        userProfiles[msg.sender].rewardBalance += reward;

        emit SpinResult(msg.sender, reward);
    }


    // Like a POST
    function likePost(uint256 postId) public {
        require(postId < posts.length, "Invalid post ID");
        postLikes[postId].push(msg.sender);
        posts[postId].likeCount++;
        emit NewLike(postId, msg.sender);
    }

    // Comment on a POST
    function commentOnPost(uint256 postId, string memory commentContent) public {
        require(postId < posts.length, "Invalid post ID");

        Comment memory newComment = Comment({
            commentContent: commentContent,
            commenter: msg.sender,
            timestamp: block.timestamp
        });

        postComments[postId].push(newComment);
        emit NewComment(postId, commentContent, msg.sender, block.timestamp);
    }

    // RePOST a POST with optional new content and media URL
    function share(uint256 postId, string memory newContent, string memory newMediaUrl) public {
        require(postId < posts.length, "Invalid post ID");

        Post memory newPost = Post({
            content: newContent,
            mediaUrl: newMediaUrl,
            author: msg.sender,
            timestamp: block.timestamp,
            likeCount: 0,
            shareCount: 0
        });

        posts.push(newPost);
        posts[postId].shareCount++;
        emit NewShare(postId, msg.sender, newContent, newMediaUrl, block.timestamp);
    }

    // Update profile picture
    function updateProfilePicture(string memory profilePicture) public {
        userProfiles[msg.sender].profilePicture = profilePicture;
        emit ProfilePictureUpdated(msg.sender, profilePicture);
    }

    // Get profile picture of a user
    function getProfilePicture(address user) public view returns (string memory) {
        return userProfiles[user].profilePicture;
    }

    // Get reward balance of a user
    function getRewardBalance(address user) public view returns (uint256) {
        return userProfiles[user].rewardBalance;
    }

    // Get all POSTs
    function getAllPosts() public view returns (Post[] memory) {
        return posts;
    }

    // Get comments on a specific POST
    function getComments(uint256 postId) public view returns (Comment[] memory) {
        return postComments[postId];
    }

    // Get users who liked a specific POST
    function getLikes(uint256 postId) public view returns (address[] memory) {
        return postLikes[postId];
    }
}

