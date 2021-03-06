const assert = require('assert');
const ganache = require('ganache-cli');
// The Web3 constructor function to make instances of the Web3 library
const Web3 = require('web3');
// Immediately create an instance of Web3
// Follow by providing a Provider -
// the comm layer between web3 library and specific Ethereum network
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');



let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    // Use provider to return a list of accounts the node controls
    accounts = await web3.eth.getAccounts();

    // Use Contract() constructor from web3.eth library, passing in compiledFactory ABI
    // compiledFactory ABI (Solidity <-> JavaScript)
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });  // Send transaction out to network

    // 100 wei minimum to keep it simple
    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    // Get array of deployed contract addresses
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

    campaign = await new web3.eth.Contract(
        // Pass in the jsonInterface ABI for our compiled campaign
        // And pass in the address
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );
});

// Make sure both factory and campaign were successfully deployed
describe('Campaigns', () => {
    it('should deploy a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('should mark caller as the campaign manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('should allow people to contribute money and be marked as approver', async () => {
        await campaign.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });
        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);
    });

    it('should require a minimum contribution', async () => {
        try {
            await campaign.methods.contribute().send({
                value: '5',
                from: accounts[1]
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it('should allow manager to make a payment request', async () => {
        await campaign.methods
            .createRequest('Buy batteries', '100', accounts[1])
            .send({
                from: accounts[0],
                gas: '1000000'
            });
        const request = await campaign.methods.requests(0).call();

        assert.equal('Buy batteries', request.description);
    });

    it('should process requests', async () => {
        // Contribute some amount of money to our campaign
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether') // use web3 to handle ether
        });

        // Create a request to send portion of the 10 ether to another account
        await campaign.methods
            .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
            .send({ from: accounts[0], gas: '1000000' });

        // Vote/approve request
        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        // Finalize the request b/c our single approver has voted 'yes'
        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],  // only manager has authority to finalize
            gas: '1000000'
        });

        // Retrieve balance of receiving account (1)
        // Verify receiving account has the money transferred to it
        let balance = await web3.eth.getBalance(accounts[1]); // returns string
        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);

        // 104 recognizes payments in gas
        // Exact amount difficult - ganache doesn't clean up between tests
        assert(balance > 104);
    });
});