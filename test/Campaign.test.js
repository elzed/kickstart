const assert = require('assert');
const ganache = require('ganache-cli');
// The Web3 constructor function to make instances of the Web3 library
const Web3 = require('web3');
// Immediately create an instance of Web3
// Follow by providing a Provider -
// the comm layer between web3 library and specific Ethereum network
const web3 = new Web3(ganache.provider);

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

    campaign = await new Web3.eth.Contract(
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
});