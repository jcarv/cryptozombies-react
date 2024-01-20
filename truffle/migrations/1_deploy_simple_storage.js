const SimpleStorage = artifacts.require("SimpleStorage");
const ZombieFactory = artifacts.require("ZombieFactory");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(ZombieFactory);
};
