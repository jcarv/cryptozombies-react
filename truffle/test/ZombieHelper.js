const utils = require("./helpers/utils");

const ZombieHelper = artifacts.require("ZombieHelper");

const zombieNames = ["Zombie 1", "Zombie 2"];

contract("ZombieHelper", (accounts) => {
    let [alice, bob] = accounts;

    let zombieHelperInstance;
    beforeEach(async () => {
        zombieHelperInstance = await ZombieHelper.new();
    });

    it("should fail level up because not enough for fees", async () => {
        await zombieHelperInstance.setLevelUpFee(web3.utils.toWei("0.001"));
        const resultZombie = await zombieHelperInstance.createRandomZombie(zombieNames[0], {from: alice});
        assert.equal(resultZombie.receipt.status, true);
        await utils.shouldThrow(zombieHelperInstance.levelUp(resultZombie.logs[0].args.zombieId, {from: alice, value: web3.utils.toWei("0.0001")}));
    })

    it("should change name", async () => {
        let newZombieName = "TestChangeName";
        await zombieHelperInstance.setLevelUpFee(web3.utils.toWei("0.001"));
        const resultZombie = await zombieHelperInstance.createRandomZombie(zombieNames[0], {from: alice});
        assert.equal(resultZombie.receipt.status, true);

        const levelRequiredForLevelup = 2;
        for (let i = 1; i < levelRequiredForLevelup; i++) {
            let resultLevelUp = await zombieHelperInstance.levelUp(resultZombie.logs[0].args.zombieId, {from: alice, value: web3.utils.toWei("0.001")});
            assert.equal(resultLevelUp.receipt.status, true);
        } 

        const resultChangeName = await zombieHelperInstance.changeName(resultZombie.logs[0].args.zombieId, newZombieName, {from: alice});
        assert.equal(resultChangeName.receipt.status, true);
        const zombies = await zombieHelperInstance.read();
        assert.equal(zombies[resultZombie.logs[0].args.zombieId].name, newZombieName);
    })

    it("should not allow other users besides owner to change name", async () => {
        let newZombieName = "TestChangeName";
        await zombieHelperInstance.setLevelUpFee(web3.utils.toWei("0.001"));
        const resultZombie = await zombieHelperInstance.createRandomZombie(zombieNames[0], {from: alice});
        assert.equal(resultZombie.receipt.status, true);

        const levelRequiredForLevelup = 2;
        for (let i = 1; i < levelRequiredForLevelup; i++) {
            let resultLevelUp = await zombieHelperInstance.levelUp(resultZombie.logs[0].args.zombieId, {from: alice, value: web3.utils.toWei("0.001")});
            assert.equal(resultLevelUp.receipt.status, true);
        } 

        await utils.shouldThrow(zombieHelperInstance.changeName(resultZombie.logs[0].args.zombieId, newZombieName, {from: bob}));
    })

    it("should not allow to change name under leveled", async () => {
        const resultZombie = await zombieHelperInstance.createRandomZombie(zombieNames[0], {from: alice});
        assert.equal(resultZombie.receipt.status, true);
        await utils.shouldThrow(zombieHelperInstance.changeName(resultZombie.logs[0].args.zombieId, "testName", {from: alice}));
    })

    it("should change dna", async () => {
        let newZombieDna = 123456789;
        await zombieHelperInstance.setLevelUpFee(web3.utils.toWei("0.001"));
        const resultZombie = await zombieHelperInstance.createRandomZombie(zombieNames[0], {from: alice});
        assert.equal(resultZombie.receipt.status, true);

        const levelRequiredForLevelup = 20;
        for (let i = 1; i < levelRequiredForLevelup; i++) {
            let resultLevelUp = await zombieHelperInstance.levelUp(resultZombie.logs[0].args.zombieId, {from: alice, value: web3.utils.toWei("0.001")});
            assert.equal(resultLevelUp.receipt.status, true);
        } 

        const resultChangeDna = await zombieHelperInstance.changeDna(resultZombie.logs[0].args.zombieId, newZombieDna, {from: alice});
        assert.equal(resultChangeDna.receipt.status, true);
        const zombies = await zombieHelperInstance.read();
        assert.equal(zombies[resultZombie.logs[0].args.zombieId].dna, newZombieDna);
    })

    it("should not allow other users besides owner to change dna", async () => {
        let newZombieDna = 123456789;
        await zombieHelperInstance.setLevelUpFee(web3.utils.toWei("0.001"));
        const resultZombie = await zombieHelperInstance.createRandomZombie(zombieNames[0], {from: alice});
        assert.equal(resultZombie.receipt.status, true);

        const levelRequiredForLevelup = 20;
        for (let i = 1; i < levelRequiredForLevelup; i++) {
            let resultLevelUp = await zombieHelperInstance.levelUp(resultZombie.logs[0].args.zombieId, {from: alice, value: web3.utils.toWei("0.001")});
            assert.equal(resultLevelUp.receipt.status, true);
        } 

        await utils.shouldThrow(zombieHelperInstance.changeDna(resultZombie.logs[0].args.zombieId, newZombieDna, {from: bob}));
    })

    it("should not allow to change dna under leveled", async () => {
        let newZombieDna = 123456789;
        await zombieHelperInstance.setLevelUpFee(web3.utils.toWei("0.001"));
        const resultZombie = await zombieHelperInstance.createRandomZombie(zombieNames[0], {from: alice});
        assert.equal(resultZombie.receipt.status, true);

        const levelRequiredForLevelup = 10;
        for (let i = 1; i < levelRequiredForLevelup; i++) {
            let resultLevelUp = await zombieHelperInstance.levelUp(resultZombie.logs[0].args.zombieId, {from: alice, value: web3.utils.toWei("0.001")});
            assert.equal(resultLevelUp.receipt.status, true);
        } 

        await utils.shouldThrow(zombieHelperInstance.changeDna(resultZombie.logs[0].args.zombieId, newZombieDna, {from: alice}));
    })

//test withdraw
})