// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./IERC721.sol";
import "./SecondHandChain.sol";

contract ERC721 is IERC721, SecondHandChain {

    function balanceOf(address _owner) external view returns (uint256){
        return phonesPerOwner[_owner];
    }

    function ownerOf(uint256 _tokenId) external view returns (address){
        return phoneOwner[_tokenId];
    }

    function _validationPreTransfer(address _from, address _to, uint _phoneId) private view {        
        require(_to != address(0) && _to != _from, "Transfer is to address 0 or to the owner" );
        require(_from == phoneOwner[_phoneId] , "From is not the owner");
        require(msg.sender == phoneOwner[_phoneId]
            || msg.sender == phoneApproval[_phoneId]
            || msg.sender == approvalForAll[msg.sender]
            || ( isPhoneOnSale[_phoneId] && phoneApproval[_phoneId] == address(this))
            , "The sender is not the owner, an approved account, an approved operator for all tokens or the token is on sale"
        );
    }


    function _transfer(address _from, address _to, uint _phoneId) private {
        phonesPerOwner[_from]--;
        phonesPerOwner[_to]++;
        phoneOwner[_phoneId]=_to;
        phones[_phoneId].owners.push(_to);
        phones[_phoneId].saleTime.push(block.timestamp);
        phones[_phoneId].salePrice.push(phones[_phoneId].price);
        isPhoneOnSale[_phoneId] = false;
        numberOfPhonesOnSale--;
        phoneApproval[_phoneId] = address(0);
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory data) external payable{
        _validationPreTransfer(_from, _to, _tokenId);

        require(msg.value >= phones[_tokenId].price, "No payment no token");

        if (msg.value > phones[_tokenId].price){
            payable(msg.sender).transfer(msg.value - phones[_tokenId].price);
        }

        payable(phoneOwner[_tokenId]).transfer(phones[_tokenId].price);
    
        _transfer(_from, _to, _tokenId);
        emit Transfer(_from, _to, _tokenId);
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable{
        _validationPreTransfer(_from, _to, _tokenId);

        require(msg.value >= phones[_tokenId].price, "No payment no token");

        if (msg.value > phones[_tokenId].price){
            payable(msg.sender).transfer(msg.value - phones[_tokenId].price);
        }

        payable(phoneOwner[_tokenId]).transfer(phones[_tokenId].price);

        _transfer(_from, _to, _tokenId);
        emit Transfer(_from, _to, _tokenId);
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) external payable{
        _validationPreTransfer(_from, _to, _tokenId);
        require(msg.value >= phones[_tokenId].price, "No payment no token");
        
        if (msg.value > phones[_tokenId].price){
            payable(msg.sender).transfer(msg.value - phones[_tokenId].price);
        }

        payable(phoneOwner[_tokenId]).transfer(phones[_tokenId].price);
        _transfer(_from, _to, _tokenId);
        emit Transfer(_from, _to, _tokenId);
    }

    function approve(address _approved, uint256 _tokenId) external payable {
        require(msg.sender == phoneOwner[_tokenId], "You do not own this token");
        phoneApproval[_tokenId]=_approved;
        emit Approval(phoneOwner[_tokenId], _approved, _tokenId);
    }

    function setApprovalForAll(address _operator, bool _approved) external {
        if(_approved){
            approvalForAll[msg.sender]=_operator;
        }else{
            approvalForAll[msg.sender]=address(0);
        }

        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function getApproved(uint256 _tokenId) external view returns (address) {
        return phoneApproval[_tokenId];
    }

    function isApprovedForAll(address _owner, address _operator) external view returns (bool) {
        if (approvalForAll[_owner]==_operator){
            return true;
        }
        return false;
    }

}