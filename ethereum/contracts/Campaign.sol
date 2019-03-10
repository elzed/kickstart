pragma solidity ^0.4.17;

contract CampaignFactory {
    // Keep list to track of all deployed campaigns
    address[] public deployedCampaigns;

    // Users are able to create their own campaign and by calling this
    // contract within the contract, they pay deployment costs
    function createCampaign(uint minimum) public {
        // Allow user deployment with min contribution value named
        // Assign returned Campaign address to local variable
        address newCampaign = new Campaign(minimum, msg.sender);
        // Add address to our array of all deployed campaigns
        deployedCampaigns.push(newCampaign);
    }
}



contract Campaign {
    struct Request {
        // Define types and fields for our struct
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;  // requests array holds elements of type Request
    address public manager;  // Define the manager
    uint public minimumContribution;
    // Refactor an array to a mapping | address[] public approvers;
    mapping(address => bool) public approvers;
    // Add variable to track number of contributors (or approvers???)
    uint public approversCount;

    // Add modifier `restricted` to any given function to access its behavior
    modifier restricted() {
        require(msg.sender == manager);
        // The function body is inserted where the special symbol `_;`
        // in the definition of a modifier appears
        _;
    }

    // Define the constructor function
    // Function sets the owner and the minimumContribution
    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    // Call whenever someone wants to send money to contract
    // Must label as `payable` any time money is sent
    function contribute() public payable {

        // Access the global variable `msg` to verify value in wei
        require(msg.value > minimumContribution);

        // Add address from `msg.sender` to `approvers` mapping as a key
        // Set its value to `true`
        approvers[msg.sender] = true;

        // Increment total number of contributors/approvers
        approversCount++;

    }

    function createRequest(string description, uint value, address recipient)
        public restricted {
            // Assign instance of Request struct with its fields in braces
            // to variable `newRequest` of type Request
            Request memory newRequest = Request({
                description: description,
                value: value,
                recipient: recipient,
                complete: false,
                approvalCount: 0
            });

            // Add instantiated struct to `requests` array
            requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        // Require approvers mapping has sender's address (returns true)
        require(approvers[msg.sender]);
        // If approvals[msg.sender] exists then vote already recorded
        // and it must NOT be already recorded in order to vote
        require(!request.approvals[msg.sender]);

        // To record that sender has now voted
        request.approvals[msg.sender] = true;

        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        // Verify manager has received majority yes votes
        require(request.approvalCount > (approversCount / 2));
        // Verify that request has never been finalized
        require(!request.complete);

        // Address types (recipient) have access to transfer() method
        // Transfer funds to designated address after enough yes votes
        request.recipient.transfer(request.value);

        request.complete = true;
    }
}
