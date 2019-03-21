// Configure web3 with a provider from MetaMask

import Web3 from 'web3';

// Assign the provider given to us from MetaMask
// This presumes MetaMask has injected a provider into the page
const web3 = new Web3(window.web3.currentProvider);

export default web3;