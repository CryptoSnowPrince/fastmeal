// SPDX-License-Identifier: MIT

//  _______  _______  ___          _______  ______    _______  _______  _______  ___      _______      _______  __   __  _______  _______  _______    ____
// |       ||       ||   |        |       ||    _ |  |       ||       ||   _   ||   |    |       |    |       ||  | |  ||   _   ||       ||       |  |    |
// |    ___||_     _||   |        |    _  ||   | ||  |    ___||  _____||  |_|  ||   |    |    ___|    |    _  ||  |_|  ||  |_|  ||  _____||    ___|   |   |
// |   |___   |   |  |   |        |   |_| ||   |_||_ |   |___ | |_____ |       ||   |    |   |___     |   |_| ||       ||       || |_____ |   |___    |   |
// |    ___|  |   |  |   |___     |    ___||    __  ||    ___||_____  ||       ||   |___ |    ___|    |    ___||       ||       ||_____  ||    ___|   |   |
// |   |      |   |  |       |    |   |    |   |  | ||   |___  _____| ||   _   ||       ||   |___     |   |    |   _   ||   _   | _____| ||   |___    |   |
// |___|      |___|  |_______|    |___|    |___|  |_||_______||_______||__| |__||_______||_______|    |___|    |__| |__||__| |__||_______||_______|   |___|
//

// File @openzeppelin/contracts/utils/Context.sol@v4.9.3

// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

// File contracts/FastMealPresalePhase1.sol

// Presale Strategy
// FastMeal Token Presale
// Name: FastMeal
// Symbol: $FTL
// Decimals: 6
// Total Supply: 1.5 billion $FTL tokens
// Presale: 30% (450 million $FTL)
//      Phase 1:
//      - Allocation: 5% of Private and Presale (22,500,000 $FTL)
//      - Price per Token: $0.01 per $FTL
//      - Total Funds Raised in Phase 1: $225,000
contract FastMealPresalePhase1 is OwnableUpgradeable {
    IERC20 public FTL;
    uint256 public TOKEN_PRICE_NUM; // token price numerator in USDT
    uint256 public TOKEN_PRICE_DEN; // token price denominator in USDT
    uint256 public START_TIME;
    uint256 public END_TIME;

    IERC20 public USDT;

    uint256 public totalAmounts;
    uint256 public totalFunds;

    mapping(address => uint256) public userAmounts;
    mapping(address => uint256) public userFunds;

    function initialize(
        IERC20 _ftl,
        uint256 _tokenPriceNum,
        uint256 _tokenPriceDen,
        uint256 _startTime,
        uint256 _endTime,
        IERC20 _usdt
    ) public initializer {
        __Ownable_init();
        FTL = _ftl;
        TOKEN_PRICE_NUM = _tokenPriceNum;
        TOKEN_PRICE_DEN = _tokenPriceDen;
        START_TIME = _startTime;
        END_TIME = _endTime;
        USDT = _usdt;
    }

    function buyToken(uint256 amount) external {
        require(block.timestamp >= START_TIME, "START_TIME_UNDER");
        require(block.timestamp <= END_TIME, "END_TIME_OVER");

        uint256 usdtAmount = (amount * TOKEN_PRICE_NUM) / TOKEN_PRICE_DEN;
        userFunds[msg.sender] += usdtAmount;

        SafeERC20.safeTransferFrom(USDT, msg.sender, address(this), usdtAmount);
        userAmounts[msg.sender] += amount;

        totalFunds += usdtAmount;
        totalAmounts += amount;

        SafeERC20.safeTransfer(FTL, msg.sender, amount);
    }

    function SetToken(IERC20 _ftl) external onlyOwner {
        FTL = _ftl;
    }

    function SetTokenPrice(
        uint256 _tokenPriceNum,
        uint256 _tokenPriceDen
    ) external onlyOwner {
        TOKEN_PRICE_NUM = _tokenPriceNum;
        TOKEN_PRICE_DEN = _tokenPriceDen;
    }

    function SetStarTime(uint256 _startTime) external onlyOwner {
        START_TIME = _startTime;
    }

    function SetEndTime(uint256 _endTime) external onlyOwner {
        END_TIME = _endTime;
    }

    receive() external payable {}

    fallback() external payable {}

    function withdrawETH(address to, uint256 amount) external onlyOwner {
        require(block.timestamp > END_TIME, "END_TIME_UNDER");
        uint256 balance = address(this).balance;
        require(balance >= amount, "Insufficient funds for withdrawal");
        payable(to).transfer(amount);
    }

    function withdrawToken(
        IERC20 token,
        address to,
        uint256 amount
    ) external onlyOwner {
        require(block.timestamp > END_TIME, "END_TIME_UNDER");
        uint256 balance = token.balanceOf(address(this));
        require(balance >= amount, "Insufficient funds for withdrawal");
        SafeERC20.safeTransfer(token, to, amount);
    }
}
