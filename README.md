
#  SmartFacebook DApp
SmartFacebook is a decentralized social media platform that leverages blockchain technology to provide users with a secure, transparent, and rewarding social networking experience. Users can post, interact with content, and earn rewards through custom ERC-20 tokens, all while enjoying the benefits of decentralization.

# Features
Core Functionalities
User Interactions
Post Creation: Users can create posts with text and optional media (image or video links).
Engagement: Users can like, comment on, and share posts.
Spin the Wheel: Gamified feature allowing users to earn random rewards in tokens.
Token Rewards
Reward Distribution: Users earn RewardTokens for posting content.
Spin Rewards: Users spend tokens to spin a wheel and win additional rewards.
Tokens can be tracked, transferred, and utilized on the platform.
User Profiles
Set and update profile pictures.
Track earned rewards and activity.

# Application Workflow

Create posts with textual and media content.
Engage with other users’ posts through likes, comments, and shares.
Monitor reward balances in real-time.
Role-Specific Functionalities
Users:
Create and manage posts.
Interact with content (like, comment, share).
Participate in gamified spin-the-wheel rewards.
Manage their profile information.
Admins:
Oversee the contract and platform usage.
Ensure smooth token operations and data flow.
### Tech Stack
Smart Contract: Solidity
Blockchain: Ethereum-compatible networks
Token Standard: ERC-20 (RewardToken)
Development Tools:
OpenZeppelin for secure ERC-20 implementation.
Remix and Hardhat for smart contract development.
Frontend: Can be integrated with React.js or similar frameworks for user interaction.

### Smart Contract Overview
1. FacebookContract
This contract handles the core logic of the decentralized platform, including:

Post Management: Adding and storing posts on-chain.
User Engagement: Tracking likes, comments, and shares.
Reward Distribution: Minting tokens for user activity.
Gamification: Enabling the spin-the-wheel feature for random token rewards.
2. RewardToken
An ERC-20 token designed to incentivize user engagement. Key features:
Minting tokens for rewarding users.
Secure transfer and allowance functionalities.
Fully compliant with the ERC-20 standard.

# Key Functionalities
1. Post Management
Add posts with text and optional media.
Store and retrieve posts on-chain for full transparency.
2. User Engagement
Users can:
Like posts.
Comment on posts.
Share posts with new content or media.
3. Rewards System
Earn RewardTokens for creating posts.
Spend tokens to spin the wheel and win random rewards.
4. Gamification
Spin the Wheel: Users can:
Spend 2 tokens to spin.
Earn a random reward between 10–50 tokens.
Security Features
Access Control: Role-based permissions for minting and spending tokens.
Randomness: A pseudo-random generator for spin-the-wheel rewards (can be enhanced with Chainlink VRF).
Transparency: All actions (posts, likes, comments, rewards) are logged via blockchain events.

### How to Use
Deployment
Deploy the RewardToken contract.
Deploy the FacebookContract with the token contract address.
Frontend Integration
Use web3.js or ethers.js to connect the frontend to the contracts.
Enable wallet connection for user authentication and interaction.
User Interaction
Connect wallet to the DApp.
Interact with the platform:
Create posts.
Like, comment, or share posts.
Earn and track rewards.
Use earned tokens to spin the reward wheel.
Events for Transparency
The platform emits events to track user actions:

NewPost: Logs details of a new post.
NewLike: Tracks likes on posts.
NewComment: Logs comments with user details.
RewardIssued: Logs token rewards issued to users.
SpinResult: Tracks spin wheel outcomes.
Future Enhancements
Improved Randomness: Integrate Chainlink VRF for true randomness.
Enhanced UI: Develop an intuitive, feature-rich frontend.
Layer 2 Support: Implement scaling solutions for cost-efficient transactions.
Content Monetization: Allow users to monetize posts and content.


#  Tech Stack Highlights
Smart Contract: Solidity for business logic and Ethereum Virtual Machine compatibility.

Token Standards: ERC-20 for token rewards.

Blockchain Development Tools: Hardhat, Remix, and OpenZeppelin.

Frontend Framework: React.js (or similar) for user interface.
Contributing
Contributions are welcome! To get started:

Fork the repository.:https://github.com/maneeshmadhusudhanan/FacebookCloneDapp
Create a new branch.
Commit your changes.
Open a pull request.
### License
This project is licensed under the MIT License. Feel free to use, modify, and distribute as per the license terms.



Email: maneeshroks@gmail.com.com
GitHub: SmartFacebook DApp-https://github.com/maneeshmadhusudhanan/FacebookCloneDapp

youtube link to Smart Facebook Dapp :https://youtu.be/f35PBEUn7q8
