// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 < 0.9.0;

 interface IFaucet {

     // cannot inherit from other smart contracts
     // cannot inherit from other interfaces

     // cannot declare a constructor
     // cannot declare state vars
     // all declared functions have to be external

    function addFunds() external payable;
    function withdraw(uint withdrawAmount) external;
 }
