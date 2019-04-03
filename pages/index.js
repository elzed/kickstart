import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';

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
        return (
            <Layout>
                {/*JSX passed to Layout component as children property*/}
                <div>
                    <link
                        rel="stylesheet"
                        href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
                    />
                    <h3>Open Campaigns</h3>
                    <Button
                        floated="right"
                        content="Create Campaign"
                        icon="add circle"
                        primary
                    />
                    {this.renderCampaigns()}
                </div>
            </Layout>
        );
    }
}

// Exporting of React component required by Next.js
// when file originates from pages directory
export default CampaignIndex;