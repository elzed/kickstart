// Use IIFE syntax as per npm documentation
const routes = require('next-routes')();

routes
    .add('/campaigns/new', '/campaigns/new')
    // Define a new route mapping with wildcard
    .add('/campaigns/:address', '/campaigns/show');

// Export helpers to auto-navigate users through app
module.exports = routes;