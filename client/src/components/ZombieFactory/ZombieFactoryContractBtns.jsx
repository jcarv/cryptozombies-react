import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ZombieFactoryContractBtns({ dispatch }) {
  const { state: { contracts, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("GastZombie");

  const handleInputChange = e => {
      setInputValue(e.target.value);
  };

  var event = contracts.zombieFactoryContract.events.NewZombie(function(error, result) {
    if (error) return
      dispatch({ type: 'ADDTOLIST', zombies: { name: result.returnValues.name, dna: result.returnValues.dna}})
      // setValue([{ name: result.returnValues.name, dna: result.returnValues.dna}]);
  })

  const createRandomZombie = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    await contracts.zombieFactoryContract.methods.createRandomZombie(inputValue).send({ from: accounts[0] });
  };

  const read = async () => {
    debugger;
    const value = await contracts.zombieFactoryContract.methods.read().call({ from: accounts[0] });
    dispatch({ type: 'NEWLIST', zombies: value });
    // setValue(value);
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
            value={inputValue}
            onChange={handleInputChange}
          />)
        </div>
      </div>
  );
}

export default ZombieFactoryContractBtns;
