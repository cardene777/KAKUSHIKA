// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.19;

// Note: the ERC-165 identifier for this interface is 0x4ac0aa46.
import "./IERC6150.sol";
interface IERC6150Burnable is IERC6150 {
    /**
     * @notice Burn the `tokenId` token.
     * @dev Throws if `tokenId` is not a leaf token.
     * Throws if `tokenId` is not a valid NFT.
     * Throws if `owner` is not the owner of `tokenId` token.
     * Throws unless `msg.sender` is the current owner, an authorized operator, or the approved address for this token.
     * @param tokenId The token to be burnt
     */
    function safeBurn(uint256 tokenId) external;

    /**
     * @notice Batch burn tokens.
     * @dev Throws if one of `tokenIds` is not a leaf token.
     * Throws if one of `tokenIds` is not a valid NFT.
     * Throws if `owner` is not the owner of all `tokenIds` tokens.
     * Throws unless `msg.sender` is the current owner, an authorized operator, or the approved address for all `tokenIds`.
     * @param tokenIds The tokens to be burnt
     */
    function safeBatchBurn(uint256[] memory tokenIds) external;
}
