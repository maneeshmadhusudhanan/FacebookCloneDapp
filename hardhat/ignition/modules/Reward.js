const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
module.exports = buildModule("RewardModule", (m) => {
    const rewardToken= m.contract("RewardToken");
    return { rewardToken};
});