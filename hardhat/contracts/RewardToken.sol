// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RewardToken is ERC20 {
    address public owner;

    constructor() ERC20("RewardToken", "RWT") {
        owner = msg.sender;
        _mint(owner, 1000000 * 10**18); // Mint 1 million tokens to the contract owner
    }

    // Function to mint more tokens (accessible to anyone)
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
