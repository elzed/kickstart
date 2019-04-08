// Import instance of web3
import web3 from './web3';
// To create a new contract get the ABI of the contract
import Campaign from './build/Campaign';

export default (address) => {
    // Create and return a new contract instance with all its
    // methods and events defined in its JSON interface object
    // `new web3.eth.Contract(jsonInterface, address, options)`
    return new web3.eth.Contract(JSON.parse(Campaign.interface), address);
};