import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

const ZombieFactoryInitialState = {
  ZombieId: null,
  ZombieName: null,
  TargetDna: null,
  KittyId: null,
  Species: null,
}

function ZombieFactoryContractBtns({ dispatch }) {
  const { state: { contracts, accounts } } = useEth();
  const [zombieFactoryState, setZombieFactoryState] = useState(ZombieFactoryInitialState);

  const handleZombieIdChange = e => {
    debugger;
    setZombieFactoryState(prevState => {
      let state = {...prevState};
      state.ZombieId = e.target.value;
      return state;
    });
  };

  const handleZombieNameChange = e => {
    debugger;
    setZombieFactoryState(prevState => {
      let state = {...prevState};
      state.ZombieName = e.target.value;
      return state;
    });
  };

  const handleTargetDnaChange = e => {
    debugger;
    setZombieFactoryState(prevState => {
      let state = {...prevState};
      state.TargetDna = e.target.value;
      return state;
    });
  };

  const handleKittyIdChange = e => {
    debugger;
    setZombieFactoryState(prevState => {
      let state = {...prevState};
      state.KittyId = e.target.value;
      return state;
    });
  };

  const handleSpeciesChange = e => {
    debugger;
    setZombieFactoryState(prevState => {
      let state = {...prevState};
      state.Species = e.target.value;
      return state;
    });
  };

  var event = contracts.zombieFactoryContract.events.NewZombie(function(error, result) {
    if (error) return
      dispatch({ type: 'ADDTOLIST', zombies: [result.returnValues.name, result.returnValues.dna]});
  })

  const createRandomZombie = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (zombieFactoryState.ZombieName === null || zombieFactoryState.ZombieName === "") {
      alert("Please enter a value to write.");
      return;
    }
    await contracts.zombieFactoryContract.methods.createRandomZombie(zombieFactoryState.ZombieName).send({ from: accounts[0] });
  };
  
  const feedAndMultiply = async e => {
    debugger;
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (zombieFactoryState.ZombieId === null || zombieFactoryState.ZombieId === ""
      || zombieFactoryState.TargetDna === null || zombieFactoryState.TargetDna === ""
      || zombieFactoryState.Species === null) {
      alert("Please enter a value to write.");
      return;
    }

    await contracts.zombieFeedingContract.methods.feedAndMultiply(zombieFactoryState.ZombieId, zombieFactoryState.TargetDna, zombieFactoryState.Species).send({ from: accounts[0] });
  };

  // function feedOnKitty(uint _zombieId, uint _kittyId) public {
  const feedOnKitty = async e => {
    debugger;
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (zombieFactoryState.ZombieId === null || zombieFactoryState.ZombieId === ""
      || zombieFactoryState.KittyId === null || zombieFactoryState.KittyId === "") {
      alert("Please enter a value to write.");
      return;
    }
    await contracts.zombieFeedingContract.methods.feedOnKitty(zombieFactoryState.ZombieId, zombieFactoryState.KittyId).send({ from: accounts[0] });
  };

  const read = async () => {
    debugger;
    const value = await contracts.zombieFactoryContract.methods.read().call({ from: accounts[0] });
    dispatch({ type: 'NEWLIST', zombies: value });
  };

  return (
      <div className="btns">
        <button onClick={read}>
          read()
        </button>

        <div onClick={createRandomZombie} className="input-btn">
          createRandomZombie(<input
            type="text"
            placeholder="zombieName"
            value={setZombieFactoryState.ZombieName}
            onChange={handleZombieNameChange}
          />)
        </div>

        <div onClick={feedAndMultiply} className="input-btn">
          feedAndMultiply(<input
            type="text"
            placeholder="zombieId"
            value={setZombieFactoryState.ZombieId}
            onChange={handleZombieIdChange}
          />
          <input
            type="text"
            placeholder="targetDna"
            value={setZombieFactoryState.TargetDna}
            onChange={handleTargetDnaChange}
          />
          <input
            type="text"
            placeholder="species"
            value={setZombieFactoryState.Species}
            onChange={handleSpeciesChange}
          />)
        </div>

        <div onClick={feedOnKitty} className="input-btn">
          feedOnKitty(<input
            type="text"
            placeholder="zombieId"
            value={setZombieFactoryState.ZombieId}
            onChange={handleZombieIdChange}
          />
          <input
            type="text"
            placeholder="kittyId"
            value={setZombieFactoryState.KittyId}
            onChange={handleKittyIdChange}
          />)
        </div>
      </div>
  );
}

export default ZombieFactoryContractBtns;
