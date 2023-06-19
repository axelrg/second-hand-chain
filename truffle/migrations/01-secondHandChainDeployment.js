var SecondHandChain = artifacts.require("SecondHandChain");
var ERC721 = artifacts.require("ERC721");
var ERC721Metadata =  artifacts.require("ERC721Metadata");

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(SecondHandChain);
    await deployer.link(SecondHandChain, ERC721);
    await deployer.deploy(ERC721);
    await deployer.link(ERC721, ERC721Metadata);
    await deployer.deploy(ERC721Metadata);
  }