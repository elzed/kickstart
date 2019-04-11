// Use IIFE syntax as per npm documentation
const routes = require('next-routes')();

routes
    .add('/campaigns/new', '/campaigns/new')
    // Define a new route mapping with wildcard
    .add('/campaigns/:address', '/campaigns/show')
    .add('/campaigns/:address/requests', '/campaigns/requests/index');

// Export helpers to auto-navigate users through app
module.exports = routes;