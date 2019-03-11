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


// Contains two separate objects:
// Campaign Contract and Campaign Factory
const output = solc.compile(source, 1).contracts;


// Write output to the build directory
fs.ensureDirSync(buildPath);  // make sure there's a directory at all

for (let contract in output) {  // iterate over object props AKA campaign contracts
    fs.outputJsonSync(
        // Create absolute path and remove the solidity default of prefixing colon,
        // Output the object we are iterating over into its named file
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}