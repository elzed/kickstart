// TODO: Use Factory instance to retrieve a list of deployed campaigns
// TODO: Use React to show something about each campaign

import React, { Component } from 'react';
import factory from '../ethereum/factory';

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