const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
module.exports = buildModule("FacebookModule", (m) => {
    const facebook = m.contract("FacebookContract");
    return { facebook };
});