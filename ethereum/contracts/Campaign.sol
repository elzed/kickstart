pragma solidity ^0.4.17;

contract Campaign {
    address public manager;  // Define the manager
    uint public minimumContribution;
    address[] public approvers;

    // Define the constructor function
    // Function sets the owner and the minimumContribution
    function Campaign(uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    // Call whenever someone wants to send money to contract
    // Must label as `payable` any time money is sent
    function contribute() public payable {

        // Access the global variable `msg` to verify value in wei
        require(msg.value > minimumContribution);

        approvers.push(msg.sender);

    }
}
