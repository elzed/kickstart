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

// TODO: Create beforeEach() statement to deploy instance of compiledFactory
// TODO: Access compiledFactory to create campaigns and write test around them
