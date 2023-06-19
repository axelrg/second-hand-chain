// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./ERC721.sol";
import "./IERC721Metadata.sol";

contract ERC721Metadata is ERC721, IERC721Metadata  {

    function name() external view returns (string memory _name){
        return "NFT collection of real phones validated by IMEI ";
    }

    function symbol() external view returns (string memory _symbol){
        return "NFT collection of real phones validated by IMEI ";
    }

    function tokenURI(uint256 _tokenId) external view returns (string memory){
        return phones[_tokenId].url;
    }
}