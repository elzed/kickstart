// Tell web3 that a deployed copy of the 'CampaignFactory' exists

import web3 from './web3';
// The pre-compiled CampaignFactory has the deployed contract's ABI
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x90e5ebb0Fc8EAfCbdbF06433Dd5Df7993EB27c93'
);

export default instance;