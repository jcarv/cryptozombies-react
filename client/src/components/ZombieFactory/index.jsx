// import Welcome from "./Welcome";
// import Tree from "./Tree";
// import Desc from "./Desc";

// import { useState } from "react";
import { useReducer } from 'react'

import useEth from "../../contexts/EthContext/useEth";
import ZombieFactoryContract from "./ZombieFactoryContract";
import ZombieFactoryContractBtns from "./ZombieFactoryContractBtns";
import NoticeNoArtifact from "../Shared/NoticeNoArtifact";
import NoticeWrongNetwork from "../Shared/NoticeWrongNetwork";

function ZombieFactory() {
  const { state } = useEth();
  // const [value, setValue] = useState([]);
  const [value, dispatch] = useReducer(reducer, []);

  function reducer(state, action) {
    debugger;
    switch (action.type) {
      case 'NEWLIST': return [...action.zombies];
      case 'ADDTOLIST': return [...state, [action.zombies.name, action.zombies.dna]];
      default: return state
    }
  }

  const zombieFactoryRender =
  <>
    <div className="contract-container">
        <ZombieFactoryContract zombieList={value}/>
        <ZombieFactoryContractBtns dispatch={dispatch}/>
    </div>
  </>;

  return (
    <div className="demo">
    {
      !state.artifacts ? <NoticeNoArtifact /> :
        !state.contracts ? <NoticeWrongNetwork /> :
        zombieFactoryRender
    }
    </div>
  );
}

export default ZombieFactory; 