const SecondHandChain = artifacts.require("SecondHandChain");

module.exports = function(deployer) {
    deployer.deploy(SecondHandChain);
}