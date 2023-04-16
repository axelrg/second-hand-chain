var SecondHandChain = artifacts.require("SecondHandChain");
var ERC721 = artifacts.require("ERC721");

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(SecondHandChain);
    await deployer.link(SecondHandChain, ERC721);
    await deployer.deploy(ERC721);
  }