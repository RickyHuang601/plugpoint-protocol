// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IERC20Burnable is IERC20 {
    function burnFrom(address account, uint256 value) external;
}

/// @title PlugPoint Gateway
/// @notice Permissionless game registration and automatic creator/platform/burn settlement.
contract PlugPointGateway is Ownable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20Burnable public immutable plugToken;
    address public platformTreasury;

    uint16 public platformFeeBps = 1500;
    uint16 public burnBps = 500;
    uint16 public constant MAX_PLATFORM_FEE_BPS = 2500;
    uint16 public constant MAX_BURN_BPS = 1000;
    uint16 public constant BPS_DENOMINATOR = 10000;
    uint256 public nextAppId = 1;

    struct GameApp {
        address owner;
        address payoutWallet;
        string metadataUri;
        bool active;
        uint256 totalVolume;
    }

    mapping(uint256 => GameApp) public games;

    error ZeroAddress();
    error InvalidAmount();
    error GameNotActive(uint256 appId);
    error NotGameOwner(uint256 appId, address caller);
    error PlatformFeeTooHigh(uint16 requested, uint16 maximum);
    error BurnRateTooHigh(uint16 requested, uint16 maximum);

    event GameRegistered(
        uint256 indexed appId,
        address indexed owner,
        address payoutWallet,
        string metadataUri
    );
    event GameUpdated(uint256 indexed appId, address newPayoutWallet, bool active);
    event PointsSpent(
        uint256 indexed appId,
        address indexed player,
        uint256 totalAmount,
        uint256 creatorShare,
        uint256 platformShare,
        uint256 burnedAmount,
        string orderId
    );
    event FeesUpdated(uint16 platformFeeBps, uint16 burnBps);
    event PlatformTreasuryUpdated(address indexed oldTreasury, address indexed newTreasury);

    constructor(address _plugToken, address _platformTreasury) Ownable(msg.sender) {
        if (_plugToken == address(0) || _platformTreasury == address(0)) {
            revert ZeroAddress();
        }
        plugToken = IERC20Burnable(_plugToken);
        platformTreasury = _platformTreasury;
    }

    function registerGame(
        address payoutWallet,
        string calldata metadataUri
    ) external returns (uint256 appId) {
        if (payoutWallet == address(0)) revert ZeroAddress();

        appId = nextAppId++;
        games[appId] = GameApp({
            owner: msg.sender,
            payoutWallet: payoutWallet,
            metadataUri: metadataUri,
            active: true,
            totalVolume: 0
        });

        emit GameRegistered(appId, msg.sender, payoutWallet, metadataUri);
    }

    function updateGameConfig(
        uint256 appId,
        address newPayoutWallet,
        string calldata newMetadataUri,
        bool active
    ) external {
        GameApp storage game = games[appId];
        if (game.owner != msg.sender) revert NotGameOwner(appId, msg.sender);
        if (newPayoutWallet == address(0)) revert ZeroAddress();

        game.payoutWallet = newPayoutWallet;
        game.metadataUri = newMetadataUri;
        game.active = active;

        emit GameUpdated(appId, newPayoutWallet, active);
    }

    function spendPoints(
        uint256 appId,
        uint256 amount,
        string calldata orderId
    ) external nonReentrant whenNotPaused {
        GameApp storage game = games[appId];
        if (!game.active) revert GameNotActive(appId);
        if (amount == 0) revert InvalidAmount();

        uint256 burnAmount = (amount * burnBps) / BPS_DENOMINATOR;
        uint256 platformShare = (amount * platformFeeBps) / BPS_DENOMINATOR;
        uint256 creatorShare = amount - burnAmount - platformShare;

        if (burnAmount > 0) {
            plugToken.burnFrom(msg.sender, burnAmount);
        }
        if (platformShare > 0) {
            IERC20(address(plugToken)).safeTransferFrom(
                msg.sender,
                platformTreasury,
                platformShare
            );
        }
        if (creatorShare > 0) {
            IERC20(address(plugToken)).safeTransferFrom(
                msg.sender,
                game.payoutWallet,
                creatorShare
            );
        }

        game.totalVolume += amount;

        emit PointsSpent(
            appId,
            msg.sender,
            amount,
            creatorShare,
            platformShare,
            burnAmount,
            orderId
        );
    }

    function setFees(uint16 _platformFeeBps, uint16 _burnBps) external onlyOwner {
        if (_platformFeeBps > MAX_PLATFORM_FEE_BPS) {
            revert PlatformFeeTooHigh(_platformFeeBps, MAX_PLATFORM_FEE_BPS);
        }
        if (_burnBps > MAX_BURN_BPS) {
            revert BurnRateTooHigh(_burnBps, MAX_BURN_BPS);
        }

        platformFeeBps = _platformFeeBps;
        burnBps = _burnBps;
        emit FeesUpdated(_platformFeeBps, _burnBps);
    }

    function setPlatformTreasury(address _newTreasury) external onlyOwner {
        if (_newTreasury == address(0)) revert ZeroAddress();
        address oldTreasury = platformTreasury;
        platformTreasury = _newTreasury;
        emit PlatformTreasuryUpdated(oldTreasury, _newTreasury);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
