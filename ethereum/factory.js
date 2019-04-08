// Tell web3 that a deployed copy of the 'CampaignFactory' exists

import web3 from './web3';
// The pre-compiled CampaignFactory has the deployed contract's ABI
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xC875332d2702CBcAbE43939aae27d8b29B6D282D'
);

export default instance;