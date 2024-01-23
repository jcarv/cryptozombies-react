// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
  mapping (address => uint) value;

  function read() public view returns (uint256) {
    return value[msg.sender];
  }

  function write(uint256 newValue) public {
    value[msg.sender] = newValue;
  }
}
