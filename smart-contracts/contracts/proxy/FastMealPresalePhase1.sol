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
    struct UserInfo {
        uint256 amount;
        uint256 claimed;
        uint256 funds;
    }

    IERC20 public USDT;
    IERC20 public FTL;
    uint256 public TOKEN_PRICE_NUM; // token price numerator in USDT
    uint256 public TOKEN_PRICE_DEN; // token price denominator in USDT
    uint256 public START_TIME;
    uint256 public END_TIME;
    uint256 public VESTING_DURATION;
    uint256 public CLIFF_TIME;

    uint256 public totalAmounts;
    uint256 public totalFunds;

    mapping(address => UserInfo) public userInfo;

    event LogBuyToken(address indexed user, uint256 ftl, uint256 usdt);
    event LogClaimToken(address indexed user, uint256 ftl);

    function initialize(
        IERC20 _usdt,
        IERC20 _ftl,
        uint256 _tokenPriceNum,
        uint256 _tokenPriceDen,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _vestingDuration,
        uint256 _cliffTime
    ) public initializer {
        __Ownable_init();
        USDT = _usdt;
        FTL = _ftl;
        TOKEN_PRICE_NUM = _tokenPriceNum;
        TOKEN_PRICE_DEN = _tokenPriceDen;
        START_TIME = _startTime;
        END_TIME = _endTime;
        VESTING_DURATION = _vestingDuration;
        CLIFF_TIME = _cliffTime;
    }

    function buyToken(uint256 amount) external {
        require(block.timestamp >= START_TIME, "START_TIME_UNDER");
        require(block.timestamp <= END_TIME, "END_TIME_OVER");

        uint256 usdtAmount = (amount * TOKEN_PRICE_NUM) / TOKEN_PRICE_DEN;
        userInfo[msg.sender].funds += usdtAmount;

        SafeERC20.safeTransferFrom(USDT, msg.sender, address(this), usdtAmount);
        userInfo[msg.sender].amount += amount;

        totalFunds += usdtAmount;
        totalAmounts += amount;

        emit LogBuyToken(msg.sender, amount, usdtAmount);
    }

    function claimToken() external {
        require(block.timestamp > END_TIME + CLIFF_TIME, "NO_CLAIM_DURATION");
        uint256 delta = (block.timestamp - END_TIME - CLIFF_TIME);

        uint256 claimable = delta > VESTING_DURATION
            ? userInfo[msg.sender].amount
            : (delta * userInfo[msg.sender].amount) / VESTING_DURATION;

        require(claimable > userInfo[msg.sender].claimed, "NO_PENDING_TOKEN");
        uint256 pending = claimable - userInfo[msg.sender].claimed;
        userInfo[msg.sender].claimed = claimable;

        SafeERC20.safeTransfer(FTL, msg.sender, pending);
        emit LogClaimToken(msg.sender, pending);
    }

    function isClaimable(address user) external view returns (uint256) {
        if (block.timestamp <= END_TIME + CLIFF_TIME) return 0;

        uint256 delta = (block.timestamp - END_TIME - CLIFF_TIME);

        uint256 claimable = delta > VESTING_DURATION
            ? userInfo[user].amount
            : (delta * userInfo[user].amount) / VESTING_DURATION;

        if (claimable <= userInfo[user].claimed) return 0;

        uint256 pending = claimable - userInfo[user].claimed;

        return pending;
    }

    function SetUsdtToken(IERC20 _usdt) external onlyOwner {
        USDT = _usdt;
    }

    function SetFtlToken(IERC20 _ftl) external onlyOwner {
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

    function SetVesting(
        uint256 _vestingDuration,
        uint256 _cliffTime
    ) external onlyOwner {
        VESTING_DURATION = _vestingDuration;
        CLIFF_TIME = _cliffTime;
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
