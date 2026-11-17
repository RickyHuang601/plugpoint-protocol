// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title PlugPoint Vendor
/// @notice Sells inventory-backed PLUG for an 18-decimal payment token such as BSC USDT.
contract PlugPointVendor is Ownable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable plugToken;
    IERC20 public immutable paymentToken;
    address public platformTreasury;
    uint256 public rate;

    error ZeroAddress();
    error InvalidAmount();
    error InvalidRate();

    event PointsPurchased(
        address indexed buyer,
        uint256 usdtPaid,
        uint256 plugReceived,
        uint256 currentRate
    );
    event RateUpdated(uint256 oldRate, uint256 newRate);
    event PlatformTreasuryUpdated(address indexed oldTreasury, address indexed newTreasury);
    event UnsoldPlugWithdrawn(address indexed recipient, uint256 amount);

    constructor(
        address _plugToken,
        address _paymentToken,
        address _platformTreasury,
        uint256 _rate
    ) Ownable(msg.sender) {
        if (
            _plugToken == address(0) ||
            _paymentToken == address(0) ||
            _platformTreasury == address(0)
        ) revert ZeroAddress();
        if (_rate == 0) revert InvalidRate();

        plugToken = IERC20(_plugToken);
        paymentToken = IERC20(_paymentToken);
        platformTreasury = _platformTreasury;
        rate = _rate;
    }

    /// @notice Buys PLUG from this contract's inventory.
    /// @dev Both tokens must use 18 decimals. Payment goes directly to the treasury.
    function buyPoints(uint256 usdtAmount) external nonReentrant whenNotPaused {
        if (usdtAmount == 0) revert InvalidAmount();
        if (rate == 0) revert InvalidRate();

        uint256 plugAmount = usdtAmount * rate;
        require(
            plugToken.balanceOf(address(this)) >= plugAmount,
            "Insufficient PLUG inventory"
        );

        paymentToken.safeTransferFrom(msg.sender, platformTreasury, usdtAmount);
        plugToken.safeTransfer(msg.sender, plugAmount);

        emit PointsPurchased(msg.sender, usdtAmount, plugAmount, rate);
    }

    function setRate(uint256 _newRate) external onlyOwner {
        if (_newRate == 0) revert InvalidRate();
        uint256 oldRate = rate;
        rate = _newRate;
        emit RateUpdated(oldRate, _newRate);
    }

    function setPlatformTreasury(address _newTreasury) external onlyOwner {
        if (_newTreasury == address(0)) revert ZeroAddress();
        address oldTreasury = platformTreasury;
        platformTreasury = _newTreasury;
        emit PlatformTreasuryUpdated(oldTreasury, _newTreasury);
    }

    function withdrawUnsoldPlug(uint256 amount) external onlyOwner nonReentrant {
        if (amount == 0) revert InvalidAmount();
        plugToken.safeTransfer(owner(), amount);
        emit UnsoldPlugWithdrawn(owner(), amount);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
