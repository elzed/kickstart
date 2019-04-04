import React, { Component } from 'react';
import { Form, Button, Input } from 'semantic-ui-react';
import Layout from '../../components/Layout';

class CampaignNew extends Component {
    state = {
        minimumContribution: ''
    };

    onSubmit = (event) => {
        // Handle a form submittal
        event.preventDefault();

        // TODO: Create a new campaign by importing
        // TODO: factory instance from factory.js
        
    };

    render() {
        return (
            <Layout>
                <h3>Create a Campaign</h3>
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input
                            label="wei"
                            labelPosition="right"
                            value={this.state.minimumContribution}
                            onChange={event =>
                                this.setState({ minimumContribution: event.target.value })}
                        />
                    </Form.Field>
                    <Button primary type='submit'>Create!</Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;