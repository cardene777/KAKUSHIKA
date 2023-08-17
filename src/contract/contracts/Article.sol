// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.19;

import "./ERC6150.sol";

contract Article is ERC6150 {
    constructor(
        string memory name_,
        string memory symbol_
    ) ERC6150(name_, symbol_) {}
}