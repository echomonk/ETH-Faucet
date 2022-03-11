// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

abstract contract Logger {

    uint public testNum;

    constructor() {
        testNum = 100;
    }
    function emitLog() public virtual pure returns(bytes32);
    function test3() external pure returns (uint){
        return 100;
    }
}

// const instance = await Faucet.deployed()
// const result = await instance.test3() 
// result.toString()
// instance.emitLog()