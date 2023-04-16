// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


/*
  truffle migrate --network development
  truffle develop

  truffle compile
  truffle migrate
  SecondHandChain.deployed().then(function(instance) {contr=instance;});
  contr._createPhone("iphone 10","werwe3","apple","green",3000,1900,8,90);
  contr.getAllPhonesInAddress('0xcb32167472db9f1ee15b51c4a6fb2815a1f3a7e7');



  let instance = await ERC721.deployed()
  instance._createPhone("iphone 10","werwe3","apple","green",3000,1900,8,90,{from: accounts[3]})
  instance.ownerOf(0)
  instance.putPhoneOnSale('10000000000000000000',0)
  let actualBalance0 = await web3.eth.getBalance(accounts[0]);
  let actualBalance1 = await web3.eth.getBalance(accounts[1]);
  truffle migrate --reset
  instance.safeTransferFrom('0xf99C16ed15DE5e7A30C8460ae1e81B28fDf47797','0xb62a4ee782019cDd813Ff320818C1fbECfBE8a8a',0, {from: '0xb62a4ee782019cDd813Ff320818C1fbECfBE8a8a', value: 100000000000000000})
  instance.putPhoneOnSale(2,0,{from: '0xf99C16ed15DE5e7A30C8460ae1e81B28fDf47797'})
  instance.safeTransferFrom(accounts[0],accounts[3],0, {from: accounts[3], value: 9})

  truffle console
  instance.safeTransferFrom(accounts[2],accounts[4],0, {from: accounts[4], value: 10000000000000000000})
  instance.putPhoneOnSale('10000000000000000000',0, {from:accounts[2]})

*/

contract SecondHandChain {

  struct Phone {
    string model;
    string brand;
    string colour;
    uint16 ram;
    uint32 mem;
    address[] owners;
    uint[] saleTime;
    uint[] salePrice;
    uint price;
  }

  Phone[] public phones;
  mapping (uint => address) phoneOwner;
  mapping (address => uint) phonesPerOwner;
  mapping (string => uint) imeiPhoneId;
  mapping (string => bool) isImeiRegistered;
  mapping (uint => bool) isPhoneOnSale;
  mapping (uint => address) phoneApproval;
  mapping (address => address) approvalForAll;

  function getPhones() public view returns( Phone[] memory){
    return phones;
  }

  function getPhoneOwner(uint _id) public view returns(address){
    return phoneOwner[_id];
  }

  function imeiRegistered(string memory _imei) private view returns(bool){
    return isImeiRegistered[_imei];
  }

  function getAllPhonesInAddress(address _address) external view returns(uint[] memory){
    uint[] memory _phonesIds = new uint[](phonesPerOwner[_address]) ;
    uint j=0;
    for (uint256 i= 0; i < phones.length; i++) {
      if (phoneOwner[i]==_address) {
        _phonesIds[j]=i;
       j++;
      }
    }
    return _phonesIds;
  }

  function getIsPhoneOnSale(uint _id) external view returns(bool){
    return isPhoneOnSale[_id];
  }

  function putPhoneOnSale(uint _price, uint _phoneId) external {
    require(phoneOwner[_phoneId]==msg.sender, "You do not own that phoneId");
    isPhoneOnSale[_phoneId]=true;
    phones[_phoneId].price=_price;
    phoneApproval[_phoneId] = address(this);
  }

  function removePhoneFromSale(uint _phoneId) external {
    require(phoneOwner[_phoneId]==msg.sender, "You do not own that phoneId");
    isPhoneOnSale[_phoneId]=false;
    phoneApproval[_phoneId] = address(0);
  }

  function _createPhone(
    string memory _model,
    string memory _imei,
    string memory _brand,
    string memory _colour,
    uint _price,
    uint _salePrice,
    uint16 _ram,
    uint32 _mem 
    ) public {

    require(isImeiRegistered[_imei]==false, "IMEI already exists");

    Phone memory phone;
    phone.model = _model;
    phone.brand = _brand;
    phone.colour = _colour;
    phone.ram = _ram;
    phone.mem = _mem;
    phone.price = _salePrice;


    phones.push(phone);
    phonesPerOwner[msg.sender]++;
    uint id = phones.length-1;
    phones[id].owners.push(msg.sender);
    phones[id].saleTime.push(block.timestamp);
    phones[id].salePrice.push(_price);

    phoneOwner[id]=msg.sender;
    imeiPhoneId[_imei]=id;
    isPhoneOnSale[id] = false;
    isImeiRegistered[_imei]=true;
  }
}
