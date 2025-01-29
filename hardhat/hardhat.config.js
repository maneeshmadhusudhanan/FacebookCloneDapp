require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "alchemyhol",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    alchemyhol:{
      url: "https://eth-sepolia.g.alchemy.com/v2/MqcS0dUHHrMRtllgYyTXGQvuykJkEsVE",
      accounts:[process.env.PRIVATE_KEY]
    },
    hardhat: {
      // See its defaults
    }
  },
  solidity: "0.8.24",
};