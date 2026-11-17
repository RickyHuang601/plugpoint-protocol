// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

/// @title PlugPoint utility token
/// @notice Fixed-supply, zero-transfer-tax game points for PlugPoint Protocol.
contract PlugPointToken is ERC20, ERC20Burnable, ERC20Permit {
    uint256 public constant INITIAL_SUPPLY = 1_000_000_000 ether;

    error ZeroInitialTreasury();

    constructor(address initialTreasury)
        ERC20("PlugPoint", "PLUG")
        ERC20Permit("PlugPoint")
    {
        if (initialTreasury == address(0)) revert ZeroInitialTreasury();
        _mint(initialTreasury, INITIAL_SUPPLY);
    }
}
