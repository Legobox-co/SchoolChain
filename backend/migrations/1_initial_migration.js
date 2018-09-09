var Migrations = artifacts.require("./Migrations.sol");
// var Migrations = artifacts.require("./SchoolChainCore.sol");


module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
