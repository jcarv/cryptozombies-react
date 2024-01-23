import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async artifacts => {
      if (artifacts) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        // const { abi } = artifact;
        let simpleStorageAbi, simpleStorageAddress, simpleStorageContract;
        let zombieFactoryAbi, zombieFactoryAddress, zombieFactoryContract;
        let zombieFeedingAbi, zombieFeedingAddress, zombieFeedingContract;
        let contracts;
        try {
          debugger;
          simpleStorageAbi = artifacts.simpleStorageArtifact.abi;
          simpleStorageAddress = artifacts.simpleStorageArtifact.networks[networkID].address;
          simpleStorageContract = new web3.eth.Contract(simpleStorageAbi, simpleStorageAddress);

          zombieFactoryAbi = artifacts.zombieFactoryArtifact.abi;
          zombieFactoryAddress = artifacts.zombieFactoryArtifact.networks[networkID].address;
          zombieFactoryContract = new web3.eth.Contract(zombieFactoryAbi, zombieFactoryAddress);

          zombieFeedingAbi = artifacts.zombieFeedingArtifact.abi;
          zombieFeedingAddress = artifacts.zombieFeedingArtifact.networks[networkID].address;
          zombieFeedingContract = new web3.eth.Contract(zombieFeedingAbi, zombieFeedingAddress);

          contracts = { simpleStorageContract, zombieFactoryContract, zombieFeedingContract };
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { artifacts, web3, accounts, networkID, contracts }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const simpleStorageArtifact = require("../../contracts/SimpleStorage.json");
        const zombieFactoryArtifact = require("../../contracts/ZombieFactory.json");
        const zombieFeedingArtifact = require("../../contracts/ZombieFeeding.json");
        const artifacts = {
          simpleStorageArtifact, 
          zombieFactoryArtifact,
          zombieFeedingArtifact
        } 
        init(artifacts);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifacts);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifacts]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
