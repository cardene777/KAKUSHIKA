// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./ERC6150.sol";

contract Article is ERC6150 {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    mapping(address => uint256[]) private _userArticleTolenIds;
    constructor(
        string memory name_,
        string memory symbol_
    ) ERC6150(name_, symbol_) {
        _tokenIdCounter.increment();
    }

    function safeMintWithParent(
        address to,
        uint256 parentId
    ) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMintWithParent(to, parentId, tokenId, "");
        _userArticleTolenIds[msg.sender].push(tokenId);
    }

    function getLastTokenId() public view returns(uint256) {
        return _tokenIdCounter.current();
    }
}
