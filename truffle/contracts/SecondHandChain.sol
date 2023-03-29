// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


/*
  truffle migrate --network development
  truffle develop

  truffle compile
  truffle migrate
  SecondHandChain.deployed().then(function(instance) {contr=instance;});
  contr._createPhone("iphone 10","werwe3","apple","green",3,19)
*/

contract SecondHandChain {

  struct Phone {
    string imei;
    string model;
    string brand;
    string colour;
    uint16 ram;
    uint32 mem;
    address[] owners;
    uint[] saleTime;
    
  }

  Phone[] public phones;
  mapping (uint => address) public phoneOwner;
  mapping (string => uint) public imeiPhoneId;
  mapping (string => bool) public isImeiRegistered;

  function getPhones()public view returns( Phone[] memory){
    return phones;
  }

  function  getPhoneOwner(uint _id)public view returns(address){
    return phoneOwner[_id];
  }

  function _createPhone (
    string memory _model,
    string memory _imei,
    string memory _brand,
    string memory _colour,
    uint16 _ram,
    uint32 _mem 
    ) public {

    require(isImeiRegistered[_imei]==false, "IMEI already exists");

    Phone memory phone;
    phone.imei = _imei;
    phone.model = _model;
    phone.brand = _brand;
    phone.colour = _colour;
    phone.ram = _ram;
    phone.mem = _mem;

    phones.push(phone);
    uint id = phones.length-1;
    phones[id].owners.push(msg.sender);
    phones[id].saleTime.push(block.timestamp);

    phoneOwner[id]=msg.sender;
    imeiPhoneId[_imei]=id;
    isImeiRegistered[_imei]=true;
  }

}
