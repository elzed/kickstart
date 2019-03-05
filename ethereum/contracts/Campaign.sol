pragma solidity ^0.4.17;

contract Campaign {
    address public manager;  // Define the manager
    uint public minimumContribution;

    // Define the constructor function
    // Function sets the owner and the minimumContribution
    function Campaign(uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }
}
