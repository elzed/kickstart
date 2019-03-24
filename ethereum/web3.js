// Configure web3 with a provider from MetaMask


// .gitIgnore-d accounts file
const accountsInfo = require('./accounts');

import Web3 from 'web3';

let web3;

// Verify code is being executed in the browser and MetaMask available
// Else ...
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // We are in the browser and MetaMask is running so we will
    // use MetaMask's current provider
    web3 = new Web3(window.web3.currentProvider);
} else {
    // We are on the server OR the user is not running MetaMask so we will
    // use Infura to get a provider for our Web3 instance
    const provider = new Web3.providers.HttpProvider(
        accountsInfo.provider_url
    );
    web3 = new Web3(provider); // create our own instance of Web3
}

export default web3;