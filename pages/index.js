import React, { Component } from 'react';
import factory from '../ethereum/factory';

class CampaignIndex extends Component {
    static async getInitialProps() {
        // Use CampaignFactory instance to call getDeployedCampaigns()
        const campaigns = await factory.methods.getDeployedCampaigns().call();

        return { campaigns: campaigns };
    }

    render() {
        return <div>{this.props.campaigns[0]}</div>
    }
}

// Exporting of React component required by Next.js
// when file originates from pages directory
export default CampaignIndex;