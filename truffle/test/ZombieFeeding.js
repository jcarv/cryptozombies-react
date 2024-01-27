const utils = require("./helpers/utils");

const ZombieFeeding = artifacts.require("ZombieFeeding");

const zombieNames = ["Zombie 1", "Zombie 2"];

contract("ZombieFeeding", (accounts) => {
    let [alice, bob] = accounts;

    let zombieFeedingInstance;
    beforeEach(async () => {
        zombieFeedingInstance = await ZombieFeeding.new();
    });

    // it("should feed and multiply", async () => {
    //     const resultZombie = await zombieFeedingInstance.createRandomZombie(zombieNames[0], {from: alice});
    //     assert.equal(resultZombie.receipt.status, true);
    //     assert.equal(resultZombie.logs[0].args.name, zombieNames[0]);
    //     const resultFeedAndMultiply = await zombieFeedingInstance.feedAndMultiply(resultZombie.logs[0].args.zombieId, 123456 , {from: alice});
    //     assert.equal(resultFeedAndMultiply.receipt.status, true);
    //     assert.equal(resultFeedAndMultiply.logs[0].args.name, "NoName");
    // })

    // it("should own for feed and multiply", async () => {
    //     const resultZombie = await zombieFeedingInstance.createRandomZombie(zombieNames[0], {from: alice});
    //     assert.equal(resultZombie.receipt.status, true);
    //     assert.equal(resultZombie.logs[0].args.name, zombieNames[0]);
    //     await utils.shouldThrow(zombieFeedingInstance.feedAndMultiply(resultZombie.logs[0].args.id, "" , {from: bob}));
    // })

    // need to mock kitty
    // it("should feed on kitty", async () => {
    //     const resultZombie = await zombieFeedingInstance.createRandomZombie(zombieNames[0], {from: alice});
    //     assert.equal(resultZombie.receipt.status, true);
    //     assert.equal(resultZombie.logs[0].args.name, zombieNames[0]);
    //     const resultFeedOnKitty = await zombieFeedingInstance.feedOnKitty(resultZombie.logs[0].args.zombieId, 2001960 , {from: alice});
    //     assert.equal(resultFeedOnKitty.receipt.status, true);
    //     assert.equal(resultFeedOnKitty.logs[0].args.name, "NoName");
    // })
})