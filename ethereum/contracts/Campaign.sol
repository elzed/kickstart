pragma solidity ^0.4.17;

contract Campaign {
    struct Request {
        // Define types and fields for our struct
        string description;
        uint value;
        address recipient;
        bool complete;
    }

    Request[] public requests;  // requests array holds elements of type Request
    address public manager;  // Define the manager
    uint public minimumContribution;
    address[] public approvers;

    // Add `modifier restricted` to any given function to access its behavior
    modifier restricted() {
        require(msg.sender == manager);
        // The function body is inserted where the special symbol `_;`
        // in the definition of a modifier appears
        _;
    }

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

    function createRequest(string description, uint value, address recipient)
        public restricted {
            // Assign instance of Request struct with its fields in braces
            // to variable `newRequest` of type Request
            Request memory newRequest = Request({
                description: description,
                value: value,
                recipient: recipient,
                complete: false
            });

            // Add instantiated struct to `requests` array
            requests.push(newRequest);
    }
}
