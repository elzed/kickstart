import React, { Component } from 'react';
import factory from '../ethereum/factory';

// TODO: Refactor to move getDeployedCampaigns() out of componentDidMount()
// TODO: because server-side rendering of the later does not occur in Next.js
class CampaignIndex extends Component {
    async componentDidMount() {
        // Use CampaignFactory instance to call getDeployedCampaigns()
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        console.log(campaigns);
    }

    render() {
        return <div>Campaigns Index</div>
    }
}

// Exporting of React component required by Next.js
// when file originates from pages directory
export default CampaignIndex;