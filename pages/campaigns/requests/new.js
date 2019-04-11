import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';

class RequestNew extends Component {
    // Get address and return as prop for the component
    static async getInitialProps(props) {
        const { address } = props.query;
        return { address };
    }

    render() {
        return (
            <Form>
                <Form.Field>
                    <label>Description</label>
                    <Input />
                </Form.Field>

                <Form.Field>
                    <label>Value in Ether</label>
                    <Input />
                </Form.Field>

                <Form.Field>
                    <label>Recipient</label>
                    <Input />
                </Form.Field>
            </Form>
        );
    }
}

export default RequestNew;