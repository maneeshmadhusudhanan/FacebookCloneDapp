// const hre = require("hardhat");

// async function main() {
//   // Step 1: Use the deployed RewardToken address
//   const rewardTokenAddress = "0x8bb97C7A7BEdEc074369afe9f1069Ee4ebd37B76"; // Replace with the actual deployed RewardToken address
//   console.log("Using RewardToken deployed at:", rewardTokenAddress);

//   // Step 2: Deploy TweetContract and pass RewardToken address
//   const TweetContract = await hre.ethers.getContractFactory("TweetContract");
//   const tweetContract = await TweetContract.deploy(rewardTokenAddress); // Deploy the contract
//   console.log("TweetContract deployment transaction hash:", tweetContract.deployTransaction.hash);

//   await tweetContract.deployTransaction.wait(); // Wait for deployment confirmation
//   console.log("TweetContract deployed at:", tweetContract.address);

//   // Step 3: Grant minting permission to TweetContract
//   const rewardToken = await hre.ethers.getContractAt("RewardToken", rewardTokenAddress);
//   const tx = await rewardToken.transferOwnership(tweetContract.address); // Transfer ownership to TweetContract
//   await tx.wait();
//   console.log("Minting permission granted to TweetContract.");
// }

// // Run the script
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
// // 