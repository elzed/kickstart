import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import factory from '../ethereum/factory';

class CampaignIndex extends Component {
    static async getInitialProps() {
        // Use CampaignFactory instance to call getDeployedCampaigns()
        const campaigns = await factory.methods.getDeployedCampaigns().call();

        return { campaigns: campaigns };
    }

    renderCampaigns() {
        // Iterate over list of Campaign addresses
        // For every address, create an object
        // Each object represents an individual card (with header and description)
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <a>View Campaign</a>,
                // A fluid card takes up the width of its container
                fluid: true
            };
        });

        return <Card.Group items={items} />;
    }

    render() {
        return <div>{this.props.campaigns[0]}</div>
    }
}

// Exporting of React component required by Next.js
// when file originates from pages directory
export default CampaignIndex;