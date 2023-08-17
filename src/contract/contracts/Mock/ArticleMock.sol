// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.19;

import "../ERC6150.sol";

contract ArticleMock is ERC6150 {
    constructor(
        string memory name_,
        string memory symbol_
    ) ERC6150(name_, symbol_) {}

    function __getIndexInChildrenArray(uint256 tokenId) public view returns (uint256) {
        return super._getIndexInChildrenArray(tokenId);
    }

    function __safeBatchMintWithParent(address to, uint256 parentId, uint256[] memory tokenIds) public {
        super._safeBatchMintWithParent(to, parentId, tokenIds);
    }

    function __safeBatchMintWithParent(address to, uint256 parentId, uint256[] memory tokenIds, bytes[] memory datas) public {
        super._safeBatchMintWithParent(to, parentId, tokenIds, datas);
    }

    function __safeMintWithParent(address to, uint256 parentId, uint256 tokenId) public {
        super._safeMintWithParent(to, parentId, tokenId);
    }

    function __safeMintWithParent(address to, uint256 parentId, uint256 tokenId, bytes memory data) public {
        super._safeMintWithParent(to, parentId, tokenId, data);
    }

    function __safeBurn(uint256 tokenId) public {
        super._safeBurn(tokenId);
    }

    function __beforeMintWithParent(address to, uint256 parentId, uint256 tokenId) public {
        super._beforeMintWithParent(to, parentId, tokenId);
    }

    function __afterMintWithParent(address to, uint256 parentId, uint256 tokenId) public {
        super._afterMintWithParent(to, parentId, tokenId);
    }
}
