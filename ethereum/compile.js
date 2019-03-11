const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// If contract is compiled then either it is completely new or
// code has changed within. If the latter, delete old code.
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// TODO: Read Campaign.sol file from the contracts folder



// TODO: Compile both contracts with solidity compiler



// TODO: Write output to the build directory