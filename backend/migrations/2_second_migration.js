var migrations = artifacts.require("./SchoolChainCore.sol");

module.exports = function (deployer){
    deployer.deploy(migrations, '0x30c9D6B8767E819b37066C36E93183A69a1a7434')
}