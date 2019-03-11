const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// If contract is compiled then either it is completely new or
// code has changed within. If the latter, delete old code.
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// Read Campaign.sol file from the contracts folder
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');


// Contains two separate objects
// Campaign Contract - Campaign Factory
const output = solc.compile(source, 1).contracts


// TODO: Write output to the build directory