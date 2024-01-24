const utils = require("./helpers/utils");

const ZombieFactory = artifacts.require("ZombieFactory");

const zombieNames = ["Zombie 1", "Zombie 2"];

contract("ZombieFactory", (accounts) => {
    let [alice, bob] = accounts;

    let zombieFactoryInstance;
    beforeEach(async () => {
        zombieFactoryInstance = await ZombieFactory.new();
    });

    it("should be able to create a new zombie", async () => {
        const result = await zombieFactoryInstance.createRandomZombie(zombieNames[0], {from: alice});
        assert.equal(result.receipt.status, true);
        assert.equal(result.logs[0].args.name, zombieNames[0]);
    })

    it("should not allow two zombies", async () => {
        await zombieFactoryInstance.createRandomZombie(zombieNames[0], {from: alice});
        await utils.shouldThrow(zombieFactoryInstance.createRandomZombie(zombieNames[1], {from: alice}));
    })

    it("should read zombies", async () => {
        await zombieFactoryInstance.createRandomZombie(zombieNames[0], {from: alice});
        await zombieFactoryInstance.createRandomZombie(zombieNames[1], {from: bob});
        const zombies = await zombieFactoryInstance.read();
        assert.equal(zombies.length, 2);
        assert.equal(zombies[0].name, zombieNames[0]);
        assert.equal(zombies[1].name, zombieNames[1]);
    })
})